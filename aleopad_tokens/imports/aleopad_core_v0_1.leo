
// The 'aleopad_core_v0_1' program.
program aleopad_core_v0_1.aleo {


    // ===================== Records ======================

    record LaunchTicket {
        owner: address
        launch_id: field
        amount: u128
    }

    // ===================== Structs ======================

    struct UserPublicTicketAmountKeyData {
        user: address
        launch_id: field
    }

    struct UserPublicTicketAmount {
        ticket_amount: u128
        claimed_amount: u128
    }

    // ===================== Mappings ====================

    mapping issued_caps: field => bool;

    mapping public_launch_total_amounts: field => u128;
    mapping public_tickets: field => UserPublicTicketAmount;

    // ===================== Private claim ======================

    transition validate_private_claim(input: LaunchTicket) {
        assert(input.amount > 0u128);
    }

    // ===================== Public claim ======================

    transition validate_public_claim(launch_id: field, asset_amount: u128) {
        assert(asset_amount > 0u128);
    }
}

