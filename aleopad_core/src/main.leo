// The 'aleopad_core' program.
import credits.leo;

// The 'aleopad_core_v0_3' program.
program aleopad_core_v0_3.aleo {


    // ===================== Records ======================

    record LaunchTicket {
        owner: address
        launch_id: field
        amount: u128
    }

    record BoughtTicketAmount {
        owner: address
        launch_id: field
        amount: u128
    }

    record TicketAmountCap {
        owner: address
        launch_id: field
        amount_to_buy: u128
    }

    record AleopadLaunchAdministartion {
        owner: address
        launch_id: field,
        cap_commit_rand: scalar
    }


    // ===================== Structs ======================

    struct LaunchpadParams {
        sell_start_block_height: u32
        sell_duration_in_blocks: u32

        claim_start_block_height: u32
        claim_duration_in_blocks: u32

        credits_ratio_numerator: u128
        credits_ratio_denominator: u128

        admin: address

        is_private_sells_enabled: bool
        is_public_sells_enabled: bool

        is_cap_enabled: bool
    }

    struct CapIssueKey {
        user: address,
        launch_id: field
    }

    // ===================== Mappings ====================

    mapping launches: field => LaunchpadParams;

    mapping issued_caps: field => bool;

    mapping public_launch_total_amounts: field => u128;

    // ===================== Ensure ======================

    inline ensure_create_launch_params(
        launch_id: field,
        admin: address,
        sell_start_block_height: u32, 
        sell_duration_in_blocks: u32, 
        claim_start_block_height: u32,
        claim_duration_in_blocks: u32,
        credits_ratio_numerator: u128,
        credits_ratio_denominator: u128,
        current_block_height: u32,
        is_private_sells_enabled: bool,
        is_public_sells_enabled: bool,
    ) {
        assert(current_block_height <= sell_start_block_height);
        assert(sell_duration_in_blocks > 0u32);
        assert(claim_start_block_height >= sell_start_block_height + sell_duration_in_blocks);
        assert(is_private_sells_enabled || is_public_sells_enabled);
    }

    inline ensure_launch_admin (launch: LaunchpadParams, admin: address) {
        assert_eq(launch.admin, admin);
    }

    inline ensure_launch_credits_ratio (
        launch: LaunchpadParams, 
        credits_ratio_numerator: u128, 
        credits_ratio_denominator: u128
    ) {
        assert_eq(launch.credits_ratio_numerator, credits_ratio_numerator);
        assert_eq(launch.credits_ratio_denominator, credits_ratio_denominator);
    }

    inline ensure_launch_sell_block(
        launch: LaunchpadParams,
        current_block: u32
    ) {
        assert(launch.sell_start_block_height <= current_block && launch.sell_start_block_height + launch.sell_duration_in_blocks > current_block);
    }

    inline ensure_launch_claim_block(launch: LaunchpadParams, claim_start_block_height: u32, claim_duration_in_blocks: u32) {
        assert_eq(launch.claim_start_block_height, claim_start_block_height);
        assert_eq(launch.claim_duration_in_blocks, claim_duration_in_blocks);
    }

    inline ensure_private_sell_flag(is_private_sells_enabled: bool) {
        assert(is_private_sells_enabled);
    }

    inline ensure_public_sell_flag(is_public_sells_enabled: bool) {
        assert(is_public_sells_enabled);
    }

    inline ensure_cap_non_set(is_cap_enabled: bool) {
        assert(!is_cap_enabled);
    }
    
    inline ensure_cap_set(is_cap_enabled: bool) {
        assert(is_cap_enabled);
    }

    inline ensure_amount_in_u64_borders(amount: field) {
        assert(amount > 0field && amount <= 18446744073709551615field);
    }

    inline ensure_amount_in_u128_borders(amount: field) {
        assert(amount > 0field && amount <= 340282366920938463463374607431768211455field);
    }

    // ===================== Validate ======================

    inline validate_launch_claim_block(claim_start_block_height: u32, claim_duration_in_blocks: u32, current_block: u32) {
        assert(current_block >= claim_start_block_height);
        assert(claim_duration_in_blocks == 0u32 || current_block < claim_start_block_height + claim_duration_in_blocks);
    }


    // ===================== Create launch ======================

    transition create_launch(
        public launch_id: field,
        public admin: address,
        public sell_start_block_height: u32, 
        public sell_duration_in_blocks: u32, 
        public claim_start_block_height: u32,
        public claim_duration_in_blocks: u32,
        public credits_ratio_numerator: u128,
        public credits_ratio_denominator: u128,
        public is_private_sells_enabled: bool,
        public is_public_sells_enabled: bool,
        public is_cap_enabled: bool,
        cap_commit_rand: scalar
    ) -> AleopadLaunchAdministartion {
        let ownership: AleopadLaunchAdministartion = AleopadLaunchAdministartion {
            owner: admin,
            launch_id: launch_id,
            cap_commit_rand
        };

        return ownership then finalize(
            launch_id,
            admin,
            sell_start_block_height, 
            sell_duration_in_blocks, 
            claim_start_block_height,
            claim_duration_in_blocks,
            credits_ratio_numerator,
            credits_ratio_denominator,
            is_private_sells_enabled,
            is_public_sells_enabled,
            is_cap_enabled
        );
    }

    finalize create_launch (
        public launch_id: field,
        public admin: address,
        public sell_start_block_height: u32, 
        public sell_duration_in_blocks: u32, 
        public claim_start_block_height: u32,
        public claim_duration_in_blocks: u32,
        public credits_ratio_numerator: u128,
        public credits_ratio_denominator: u128,
        public is_private_sells_enabled: bool,
        public is_public_sells_enabled: bool,
        public is_cap_enabled: bool
    ) {
        assert(!launches.contains(launch_id));

        ensure_create_launch_params(
            launch_id,
            admin,
            sell_start_block_height, 
            sell_duration_in_blocks, 
            claim_start_block_height,
            claim_duration_in_blocks,
            credits_ratio_numerator,
            credits_ratio_denominator,
            block.height,
            is_private_sells_enabled,
            is_public_sells_enabled
        );

        let launch: LaunchpadParams = LaunchpadParams {
            sell_start_block_height,
            sell_duration_in_blocks,

            claim_start_block_height,
            claim_duration_in_blocks,

            credits_ratio_numerator,
            credits_ratio_denominator,

            admin,

            is_private_sells_enabled,
            is_public_sells_enabled,

            is_cap_enabled
        };

        Mapping::set(launches, launch_id, launch);
    }


    // ===================== Buy private ======================

    transition buy_private_without_cap (
        input: credits.leo/credits,
        amount_microcredits: field,
        launch_id: field,
        credits_ratio_numerator: u128,
        credits_ratio_denominator: u128,
        admin: address
    ) -> (LaunchTicket, BoughtTicketAmount, credits.leo/credits, credits.leo/credits) {
        ensure_amount_in_u64_borders(amount_microcredits);

        let asset_amount: u128 = (amount_microcredits as u128 * credits_ratio_numerator) / credits_ratio_denominator;

        let new_ticket: LaunchTicket = LaunchTicket {
            owner: self.caller,
            launch_id,
            amount: asset_amount
        };

        let bought_ticket: BoughtTicketAmount = BoughtTicketAmount {
            owner: admin,
            launch_id,
            amount: asset_amount
        };

        let (to_admin, to_buyer): (credits, credits) = credits.leo/transfer_private(
            input,
            admin,
            amount_microcredits as u64
        );

        return (new_ticket, bought_ticket, to_admin, to_buyer) then finalize(
            launch_id,
            credits_ratio_numerator,
            credits_ratio_denominator,
            admin
        );
    }

    finalize buy_private_without_cap (
        launch_id: field,
        credits_ratio_numerator: u128,
        credits_ratio_denominator: u128,
        admin: address
    ) {
        let launch: LaunchpadParams = launches.get(launch_id);
        ensure_launch_admin(launch, admin);
        ensure_launch_credits_ratio(launch, credits_ratio_numerator, credits_ratio_denominator);
        ensure_launch_sell_block(launch, block.height);
        ensure_private_sell_flag(launch.is_private_sells_enabled);
        ensure_cap_non_set(launch.is_cap_enabled);
    }

    function process_cap_record(cap: TicketAmountCap, asset_amount: u128, launch_id: field) -> u128  {
        assert_eq(launch_id, cap.launch_id);
        assert(cap.amount_to_buy >= asset_amount);

        return cap.amount_to_buy - asset_amount;
    }

    transition buy_private_with_cap (
        input: credits.leo/credits,
        cap: TicketAmountCap,
        amount_microcredits: field,
        launch_id: field, 
        credits_ratio_numerator: u128,
        credits_ratio_denominator: u128,
        admin: address
    ) -> (LaunchTicket, BoughtTicketAmount, credits.leo/credits, credits.leo/credits, TicketAmountCap) {
        ensure_amount_in_u64_borders(amount_microcredits);

        let asset_amount: u128 = (amount_microcredits as u128 * credits_ratio_numerator) / credits_ratio_denominator;

        let new_ticket: LaunchTicket = LaunchTicket {
            owner: self.caller,
            launch_id,
            amount: asset_amount
        };

        let bought_ticket: BoughtTicketAmount = BoughtTicketAmount {
            owner: admin,
            launch_id,
            amount: asset_amount
        };

        let (to_admin, to_buyer): (credits, credits) = credits.leo/transfer_private(
            input,
            admin,
            amount_microcredits as u64
        );

        let amount_to_buy: u128 = process_cap_record(cap, asset_amount, launch_id);

        let cap_change: TicketAmountCap = TicketAmountCap {
            owner: self.caller,
            launch_id,
            amount_to_buy
        };

        return (new_ticket, bought_ticket, to_admin, to_buyer, cap_change) then finalize(
            launch_id,
            credits_ratio_numerator,
            credits_ratio_denominator,
            admin
        );
    }

    finalize buy_private_with_cap (
        launch_id: field,
        credits_ratio_numerator: u128,
        credits_ratio_denominator: u128,
        admin: address
    ) {
        let launch: LaunchpadParams = launches.get(launch_id);
        ensure_launch_admin(launch, admin);
        ensure_launch_credits_ratio(launch, credits_ratio_numerator, credits_ratio_denominator);
        ensure_launch_sell_block(launch, block.height);
        ensure_private_sell_flag(launch.is_private_sells_enabled);
        ensure_cap_set(launch.is_cap_enabled);
    }

    // ===================== Buy public ======================

    transition buy_public_without_cap (
        amount_microcredits: field,
        launch_id: field,
        credits_ratio_numerator: u128,
        credits_ratio_denominator: u128, 
        admin: address
    ) -> (LaunchTicket, BoughtTicketAmount, credits.leo/credits) {
        ensure_amount_in_u128_borders(amount_microcredits);

        let to_admin: credits = credits.leo/transfer_public_to_private(
            admin,
            amount_microcredits as u64
        );

        let asset_amount: u128 = (amount_microcredits as u128 * credits_ratio_numerator) / credits_ratio_denominator;

        let new_ticket: LaunchTicket = LaunchTicket {
            owner: self.caller,
            launch_id,
            amount: asset_amount
        };

        let bought_ticket: BoughtTicketAmount = BoughtTicketAmount {
            owner: admin,
            launch_id,
            amount: asset_amount
        };

        return (new_ticket, bought_ticket, to_admin) then finalize(
            self.caller,
            amount_microcredits as u128,
            launch_id,
            admin,
            credits_ratio_numerator,
            credits_ratio_denominator,
            asset_amount
        );
    }

    finalize buy_public_without_cap (
        buyer: address,
        amount_microcredits: u128,
        launch_id: field, 
        admin: address,
        credits_ratio_numerator: u128,
        credits_ratio_denominator: u128,
        asset_amount: u128
    ) {
        let launch: LaunchpadParams = launches.get(launch_id);
        ensure_launch_admin(launch, admin);
        ensure_launch_sell_block(launch, block.height);
        ensure_public_sell_flag(launch.is_public_sells_enabled);
        ensure_cap_non_set(launch.is_cap_enabled);
        ensure_launch_credits_ratio(launch, credits_ratio_numerator, credits_ratio_denominator);

        let old_total_amount: u128 = Mapping::get_or_use(public_launch_total_amounts, launch_id, 0u128);
        Mapping::set(public_launch_total_amounts, launch_id, old_total_amount + asset_amount);
    }

    transition buy_public_with_cap (
        cap: TicketAmountCap,
        amount_microcredits: field,
        credits_ratio_numerator: u128,
        credits_ratio_denominator: u128,
        launch_id: field, 
        admin: address
    ) -> (LaunchTicket, BoughtTicketAmount, credits.leo/credits, TicketAmountCap) {
        ensure_amount_in_u64_borders(amount_microcredits);

        let asset_amount: u128 = (amount_microcredits as u128 * credits_ratio_numerator) / credits_ratio_denominator;

        let to_admin: credits = credits.leo/transfer_public_to_private(
            admin,
            amount_microcredits as u64
        );

        let amount_to_buy: u128 = process_cap_record(cap, asset_amount, launch_id);

        let cap_change: TicketAmountCap = TicketAmountCap {
            owner: self.caller,
            launch_id,
            amount_to_buy
        };

        let new_ticket: LaunchTicket = LaunchTicket {
            owner: self.caller,
            launch_id,
            amount: asset_amount
        };

        let bought_ticket: BoughtTicketAmount = BoughtTicketAmount {
            owner: admin,
            launch_id,
            amount: asset_amount
        };

        return (new_ticket, bought_ticket, to_admin, cap_change) then finalize(
            self.caller,
            asset_amount,
            launch_id,
            credits_ratio_numerator,
            credits_ratio_denominator,
            admin
        );
    }

    finalize buy_public_with_cap (
        buyer: address,
        asset_amount: u128,
        launch_id: field, 
        credits_ratio_numerator: u128,
        credits_ratio_denominator: u128,
        admin: address
    ) {
        let launch: LaunchpadParams = launches.get(launch_id);
        ensure_launch_admin(launch, admin);
        ensure_launch_credits_ratio(launch, credits_ratio_numerator, credits_ratio_denominator);
        ensure_launch_sell_block(launch, block.height);
        ensure_public_sell_flag(launch.is_private_sells_enabled);
        ensure_cap_set(launch.is_cap_enabled);

        let old_total_amount: u128 = Mapping::get_or_use(public_launch_total_amounts, launch_id, 0u128);
        Mapping::set(public_launch_total_amounts, launch_id, old_total_amount + asset_amount);
    }

    // ===================== Claim ======================

    transition validate_claim(input: LaunchTicket) {
        assert(input.amount > 0u128);
        return then finalize(input.launch_id);
    }

    finalize validate_claim (launch_id: field) {
        let li: LaunchpadParams = Mapping::get(launches, launch_id);
        validate_launch_claim_block(li.claim_start_block_height, li.claim_duration_in_blocks, block.height);
    }

    // ===================== Cap management ======================

    transition issue_cap_to_user(administration: AleopadLaunchAdministartion, to: address, amount: u128) -> (AleopadLaunchAdministartion, TicketAmountCap) {
        let cap: TicketAmountCap = TicketAmountCap {
            owner: to,
            launch_id: administration.launch_id,
            amount_to_buy: amount
        };

        let to_commit: field = BHP256::commit_to_field(CapIssueKey {
            user: to, 
            launch_id: administration.launch_id
        }, administration.cap_commit_rand);

        let unspent_administration: AleopadLaunchAdministartion = AleopadLaunchAdministartion {
            owner: administration.owner,
            launch_id: administration.launch_id,
            cap_commit_rand: administration.cap_commit_rand
        };

        return (unspent_administration, cap) then finalize(to_commit, administration.launch_id);
    }

    finalize issue_cap_to_user(to_commit: field, launch_id: field) {
        let is_already_issued: bool = Mapping::get_or_use(issued_caps, to_commit, false);
        assert(!is_already_issued);
        Mapping::set(issued_caps, to_commit, true);
    }
}

