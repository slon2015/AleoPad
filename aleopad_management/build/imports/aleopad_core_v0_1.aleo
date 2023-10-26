program aleopad_core_v0_1.aleo;

record BoughtTicketAmount:
    owner as address.private;
    launch_id as field.private;
    amount as u128.private;

record TicketAmountCap:
    owner as address.private;
    launch_id as field.private;
    amount_to_buy as u128.private;

record AleopadLaunchAdministartion:
    owner as address.private;
    launch_id as field.private;
    cap_commit_rand as scalar.private;

struct CapIssueKey:
    user as address;
    launch_id as field;


function create_launch:
    input r0 as field.public;
    input r1 as address.public;
    input r2 as u32.public;
    input r3 as u32.public;
    input r4 as u32.public;
    input r5 as u32.public;
    input r6 as u128.public;
    input r7 as u128.public;
    input r8 as boolean.public;
    input r9 as boolean.public;
    input r10 as boolean.public;
    input r11 as scalar.private;
    cast r1 r0 r11 into r12 as AleopadLaunchAdministartion.record;
    async create_launch into r13;
    output r12 as AleopadLaunchAdministartion.record;
    output r13 as aleopad_core_v0_1.aleo/create_launch.future;

finalize create_launch:
    assert.eq true true;
