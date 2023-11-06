program aleopad_tokens_v0_3.aleo;

record AleopadTokenAdministration:
    owner as address.private;
    token as field.private;


function create_token:
    input r0 as field.public;
    input r1 as field.public;
    input r2 as field.public;
    input r3 as u8.public;
    input r4 as address.private;
    gt r1 0field into r5;
    assert.eq r5 true;
    cast r4 r0 into r6 as AleopadTokenAdministration.record;

    async create_token into r7;
    output r6 as AleopadTokenAdministration.record;
    output r7 as aleopad_tokens_v0_3.aleo/create_token.future;

finalize create_token:
    assert.eq true true;


function create_token_with_launch:
    input r0 as field.public;
    input r1 as field.public;
    input r2 as field.public;
    input r3 as u8.public;
    input r4 as field.public;
    input r5 as address.private;
    gt r1 0field into r6;
    assert.eq r6 true;
    cast r5 r0 into r7 as AleopadTokenAdministration.record;

    async create_token_with_launch into r8;
    output r7 as AleopadTokenAdministration.record;
    output r8 as aleopad_tokens_v0_3.aleo/create_token_with_launch.future;

finalize create_token_with_launch:
    assert.eq true true;
