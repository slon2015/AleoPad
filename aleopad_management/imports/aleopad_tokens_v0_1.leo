program aleopad_tokens_v0_1.aleo {

    record AleopadTokenAdministration {
        // The token owner
        owner: address,
        // The token id
        token: field,
    }

    // ========================= token =========================

    // Create a new token.
    transition create_token(
        public token_id: field, 
        public name: field,
        public symbol: field,
        public decimals: u8,
        admin: address
    ) -> AleopadTokenAdministration {
        assert(name > 0field);

        let adm: AleopadTokenAdministration = AleopadTokenAdministration {
            owner: admin,
            token: token_id
        };

        return adm;
    }

    // ========================= admin ==========================

    transition enable_launch(adm: AleopadTokenAdministration, launch: field) -> AleopadTokenAdministration {
        return adm;
    }
}