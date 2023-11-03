
// The 'aleopad_core_v0_2' program.
program aleopad_core_v0_2.aleo {


    // ===================== Records ======================

    record LaunchTicket {
        owner: address
        launch_id: field
        amount: u128
    }

    // ===================== Private claim ======================

    transition validate_private_claim(input: LaunchTicket) {
        assert(input.amount > 0u128);
        return then finalize();
    }

    finalize validate_private_claim() {
        assert(true);
    }

    // ===================== Public claim ======================

    transition validate_public_claim(launch_id: field, asset_amount: u128) {
        assert(asset_amount > 0u128);
        return then finalize();
    }

    finalize validate_public_claim () {
        assert(true);
    }
}

