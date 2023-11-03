// The 'aleopad_core_v0_2' program.
program aleopad_core_v0_2.aleo {

    // ===================== Records ======================

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

    struct CapIssueKey {
        user: address,
        launch_id: field
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

        return ownership then finalize();
    }

    finalize create_launch() {
        assert(true);
    }
}

