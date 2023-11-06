
// The 'aleopad_core_v0_3' program.
program aleopad_core_v0_3.aleo {


    // ===================== Records ======================

    record LaunchTicket {
        owner: address
        launch_id: field
        amount: u128
    }
    // ===================== Claim ======================

    transition validate_claim(input: LaunchTicket) {
        assert(input.amount > 0u128);
        return then finalize(input.launch_id);
    }

    finalize validate_claim (launch_id: field) {
        assert(true);
    }
}

