import aleopad_core_v0_1.leo;

program aleopad_tokens_v0_1.aleo {
    // BalanceKeyData => balance
    mapping balances: field => u128;
    // AllowanceKeyData => amount
    mapping allowance: field => u128;
    // token_id => TokenInfo
    mapping tokens: field => TokenInfo;
    // TokenLaunchKeyData => is_enabled
    mapping token_launches: field => bool;
    // launch_id => is_already_enabled
    mapping launches: field => bool;

    record PrivateToken {
        // The token owner
        owner: address,
        // The token id
        token: field,
        // The token amount
        amount: u128,
    }

    record AleopadTokenAdministration {
        // The token owner
        owner: address,
        // The token id
        token: field,
    }

    struct TokenInfo {
        name: field,
        symbol: field,
        decimals: u8,
    }

    struct BalanceKeyData {
        token: field,
        user: address,
    }

    // Mapping key of allowance
    struct AllowanceKeyData {
        token: field,
        payer: address,
        spender: address,
    }

    struct TokenLaunchKeyData {
        token: field,
        launch: field
    }

    // ========================= token =========================

    // Create a new token.
    transition create_token(public token_id: field, public info: TokenInfo, admin: address) -> AleopadTokenAdministration {
        assert(info.name > 0field);

        let adm: AleopadTokenAdministration = AleopadTokenAdministration {
            owner: admin,
            token: token_id
        };

        return adm then finalize(token_id, info, self.caller);
    }

    finalize create_token(public token_id: field, public info: TokenInfo, public caller: address) {
        assert(!tokens.contains(token_id));

        tokens.set(token_id, info);
    }

    // Transfer public tokens.
    transition transfer_public(public token_id: field, public to: address, public amount: u128) {
        return then finalize(token_id, self.caller, to, amount);
    }

    finalize transfer_public(public token_id: field, public from: address, public to: address, public amount: u128) {
        // confirm token exists
        assert(tokens.contains(token_id));
        let bid_from: field = get_balance_id(token_id, from);
        let bal_from: u128 = balances.get(bid_from);
        balances.set(bid_from, bal_from - amount);

        let bid_to: field = get_balance_id(token_id, to);
        let bal_to: u128 = balances.get_or_use(bid_to, 0u128);
        balances.set(bid_to, bal_to + amount);
    }

    // Authorize other accounts to spend tokens.
    transition approve(public token_id: field, public spender: address, public amount: u128) {
        return then finalize(token_id, self.caller, spender, amount);
    }

    finalize approve(public token_id: field, public caller: address, public spender: address, public amount: u128) {
        // confirm token exists
        assert(tokens.contains(token_id));
        let key: field = get_allowance_id(token_id, caller, spender);
        allowance.set(key, amount);
    }

    // Transfer public tokens from other accounts.
    transition transfer_from(
        public token_id: field,
        public from: address,
        public to: address,
        public amount: u128
     ) {
        return then finalize(self.caller, token_id, from, to, amount);
    }

    finalize transfer_from(
        public caller: address,
        public token_id: field,
        public from: address,
        public to: address,
        public amount: u128
    ) {
        // confirm token exists
        assert(tokens.contains(token_id));
        let key: field = get_allowance_id(token_id, from, caller);
        allowance.set(key, allowance.get(key) - amount);

        let bid_from: field = get_balance_id(token_id, from);
        balances.set(bid_from, balances.get(bid_from) - amount);

        let bid_to: field = get_balance_id(token_id, to);
        balances.set(bid_to, balances.get_or_use(bid_to, 0u128) + amount);
    }

    // ========================= private token =========================

    // Transfer and convert public tokens to a new private token record (PrivateToken).
    transition transfer_public_to_private(public token_id: field, private to: address, public amount: u128) -> PrivateToken {
        // mint a new private token
        let pt: PrivateToken = PrivateToken {
            owner: to,
            token: token_id,
            amount: amount,
        };
        let test_hash: field = BHP256::hash_to_field(pt);
        return pt then finalize(token_id, self.caller, amount);
    }

    finalize transfer_public_to_private(public token_id: field, public from: address, public amount: u128) {
        // confirm token exists
        assert(tokens.contains(token_id));
        let bid_from: field = get_balance_id(token_id, from);
        balances.set(bid_from, balances.get(bid_from) - amount);
    }

    // Transfer and convert a private token record (`PrivateToken`) to public tokens.
    transition transfer_private_to_public(private pt_in: PrivateToken, public to: address, public amount: u128) -> PrivateToken {
        let pt_change: PrivateToken = PrivateToken {
            owner: pt_in.owner,
            token: pt_in.token,
            amount: pt_in.amount - amount,
        };
        return pt_change then finalize(pt_in.token, to, amount);
    }

    finalize transfer_private_to_public(public token_id: field, public to: address, public amount: u128) {
        // confirm token exists
        assert(tokens.contains(token_id));
        let bid_to: field = get_balance_id(token_id, to);
        balances.set(bid_to, balances.get_or_use(bid_to, 0u128) + amount);
    }

    // Transfer private tokens (`PrivateToken` records).
    transition transfer_private(private pt_in: PrivateToken, private to: address, private amount: u128) -> (PrivateToken, PrivateToken) {
        let pt_to: PrivateToken = PrivateToken {
            owner: to,
            token: pt_in.token,
            amount: amount,
        };

        let pt_change: PrivateToken = PrivateToken {
            owner: pt_in.owner,
            token: pt_in.token,
            amount: pt_in.amount - amount,
        };
        return (pt_to, pt_change);
    }

    // Merge two `PrivateToken` records into a new `PrivateToken` record.
    // The two records being joined must have the same owner and the token id.
    transition join(private pt1: PrivateToken, private pt2: PrivateToken) -> PrivateToken {
        assert_eq(pt1.token, pt2.token);
        // the following should always be true
        // assert_eq(pt1.owner, pt2.owner);
        // assert_eq(pt1.owner, self.caller);
        return PrivateToken {
            owner: pt1.owner,
            token: pt1.token,
            amount: pt1.amount + pt2.amount,
        };
    }

    // ========================= admin ==========================

    transition enable_launch(adm: AleopadTokenAdministration, launch: field) -> AleopadTokenAdministration {
        return adm then finalize(adm.token, launch);
    }

    finalize enable_launch(token: field, launch: field) {
        assert(!launches.contains(launch));
        assert(tokens.contains(token));

        let tlid: field = get_token_launch_id(token, launch);

        token_launches.set(tlid, true);
        launches.set(launch, true);
    }

    // ========================= claim =========================

    transition claim_private(token: field, ticket: aleopad_core_v0_1.leo/LaunchTicket) -> PrivateToken {
        let pt: PrivateToken = PrivateToken {
            owner: ticket.owner,
            token,
            amount: ticket.amount
        };

        aleopad_core_v0_1.leo/validate_private_claim(ticket);

        return pt then finalize(token, ticket.launch_id);
    }

    finalize claim_private(token: field, launch: field) {
        let tlid: field = get_token_launch_id(token, launch);
        assert(token_launches.get(tlid));
    }

    transition claim_public(token: field, launch: field, amount: u128) {
        aleopad_core_v0_1.leo/validate_public_claim(launch, amount);

        return then finalize(token, launch, self.caller, amount);
    }

    finalize claim_public(token: field, launch: field, claimer: address, amount: u128) {
        let tlid: field = get_token_launch_id(token, launch);
        assert(token_launches.get(tlid));

        let bid: field = get_balance_id(token, claimer);
        balances.set(bid, balances.get_or_use(bid, 0u128) + amount);
    }

    // ========================= inline =========================

    // Build a key of the mapping `balances`
    inline get_balance_id(token_: field, user_: address) -> field {
        // copy to avoid compiling error
        let token: field = token_;
        let user: address = user_;
        return BHP256::hash_to_field(BalanceKeyData {token, user});
    }

    // Build a key of the mapping `allowance`
    inline get_allowance_id(token_id_: field, payer_: address, spender_: address) -> field {
        let token: field = token_id_;
        let payer: address = payer_;
        let spender: address = spender_;
        // copy to avoid compiling error
        return BHP256::hash_to_field(AllowanceKeyData {token, payer, spender});
    }

    inline get_token_launch_id(token: field, launch: field) -> field {
        return BHP256::hash_to_field(TokenLaunchKeyData {token, launch});
    }
}