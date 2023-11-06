program aleopad_core_v0_3.aleo;

record LaunchTicket:
    owner as address.private;
    launch_id as field.private;
    amount as u128.private;


function validate_claim:
    input r0 as LaunchTicket.record;
    gt r0.amount 0u128 into r1;
    assert.eq r1 true;
    async validate_claim r0.launch_id into r2;
    output r2 as aleopad_core_v0_3.aleo/validate_claim.future;

finalize validate_claim:
    input r0 as field.public;
    assert.eq true true;
