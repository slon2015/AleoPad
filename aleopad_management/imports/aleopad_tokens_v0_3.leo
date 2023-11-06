program aleopad_tokens_v0_3.aleo {

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

        return adm then finalize();
    }

    finalize create_token() {
        assert(true);
    }

    transition create_token_with_launch(
        public token_id: field, 
        public name: field,
        public symbol: field,
        public decimals: u8,
        public launch: field,
        admin: address
    ) -> AleopadTokenAdministration {
        assert(name > 0field);

        let adm: AleopadTokenAdministration = AleopadTokenAdministration {
            owner: admin,
            token: token_id
        };

        return adm then finalize();
    }

    finalize create_token_with_launch() {
        assert(true);
    }
}