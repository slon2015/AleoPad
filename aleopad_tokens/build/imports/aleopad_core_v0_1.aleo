program aleopad_core_v0_1.aleo;

record LaunchTicket:
    owner as address.private;
    launch_id as field.private;
    amount as u128.private;


function validate_private_claim:
    input r0 as LaunchTicket.record;
    gt r0.amount 0u128 into r1;
    assert.eq r1 true;
    async validate_private_claim into r2;
    output r2 as aleopad_core_v0_1.aleo/validate_private_claim.future;

finalize validate_private_claim:
    assert.eq true true;


function validate_public_claim:
    input r0 as field.private;
    input r1 as u128.private;
    gt r1 0u128 into r2;
    assert.eq r2 true;
    async validate_public_claim into r3;
    output r3 as aleopad_core_v0_1.aleo/validate_public_claim.future;

finalize validate_public_claim:
    assert.eq true true;
