import credits.aleo;
program aleopad_core_v0_3.aleo;


record LaunchTicket:
    owner as address.private;
    launch_id as field.private;
    amount as u128.private;

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

struct LaunchpadParams:
    sell_start_block_height as u32;
    sell_duration_in_blocks as u32;
    claim_start_block_height as u32;
    claim_duration_in_blocks as u32;
    credits_ratio_numerator as u128;
    credits_ratio_denominator as u128;
    admin as address;
    is_private_sells_enabled as boolean;
    is_public_sells_enabled as boolean;
    is_cap_enabled as boolean;

struct CapIssueKey:
    user as address;
    launch_id as field;


mapping launches:
	key as field.public;
	value as LaunchpadParams.public;


mapping issued_caps:
	key as field.public;
	value as boolean.public;


mapping public_launch_total_amounts:
	key as field.public;
	value as u128.public;

























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
    async create_launch r0 r1 r2 r3 r4 r5 r6 r7 r8 r9 r10 into r13;
    output r12 as AleopadLaunchAdministartion.record;
    output r13 as aleopad_core_v0_3.aleo/create_launch.future;

finalize create_launch:
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
    contains launches[r0] into r11;
    not r11 into r12;
    assert.eq r12 true;
    lte block.height r2 into r13;
    assert.eq r13 true;
    gt r3 0u32 into r14;
    assert.eq r14 true;
    add r2 r3 into r15;
    gte r4 r15 into r16;
    assert.eq r16 true;
    or r8 r9 into r17;
    assert.eq r17 true;
    cast r2 r3 r4 r5 r6 r7 r1 r8 r9 r10 into r18 as LaunchpadParams;
    set r18 into launches[r0];


function buy_private_without_cap:
    input r0 as credits.aleo/credits.record;
    input r1 as field.private;
    input r2 as field.private;
    input r3 as u128.private;
    input r4 as u128.private;
    input r5 as address.private;
    gt r1 0field into r6;
    lte r1 18446744073709551615field into r7;
    and r6 r7 into r8;
    assert.eq r8 true;
    cast r1 into r9 as u128;
    mul r9 r3 into r10;
    div r10 r4 into r11;
    cast self.caller r2 r11 into r12 as LaunchTicket.record;
    cast r5 r2 r11 into r13 as BoughtTicketAmount.record;
    cast r1 into r14 as u64;
    call credits.aleo/transfer_private r0 r5 r14 into r15 r16;
    async buy_private_without_cap r2 r3 r4 r5 into r17;
    output r12 as LaunchTicket.record;
    output r13 as BoughtTicketAmount.record;
    output r15 as credits.aleo/credits.record;
    output r16 as credits.aleo/credits.record;
    output r17 as aleopad_core_v0_3.aleo/buy_private_without_cap.future;

finalize buy_private_without_cap:
    input r0 as field.public;
    input r1 as u128.public;
    input r2 as u128.public;
    input r3 as address.public;
    get launches[r0] into r4;
    assert.eq r4.admin r3;
    assert.eq r4.credits_ratio_numerator r1;
    assert.eq r4.credits_ratio_denominator r2;
    lte r4.sell_start_block_height block.height into r5;
    add r4.sell_start_block_height r4.sell_duration_in_blocks into r6;
    gt r6 block.height into r7;
    and r5 r7 into r8;
    assert.eq r8 true;
    assert.eq r4.is_private_sells_enabled true;
    not r4.is_cap_enabled into r9;
    assert.eq r9 true;


closure process_cap_record:
    input r0 as TicketAmountCap.record;
    input r1 as u128;
    input r2 as field;
    assert.eq r2 r0.launch_id;
    gte r0.amount_to_buy r1 into r3;
    assert.eq r3 true;
    sub r0.amount_to_buy r1 into r4;
    output r4 as u128;


function buy_private_with_cap:
    input r0 as credits.aleo/credits.record;
    input r1 as TicketAmountCap.record;
    input r2 as field.private;
    input r3 as field.private;
    input r4 as u128.private;
    input r5 as u128.private;
    input r6 as address.private;
    gt r2 0field into r7;
    lte r2 18446744073709551615field into r8;
    and r7 r8 into r9;
    assert.eq r9 true;
    cast r2 into r10 as u128;
    mul r10 r4 into r11;
    div r11 r5 into r12;
    cast self.caller r3 r12 into r13 as LaunchTicket.record;
    cast r6 r3 r12 into r14 as BoughtTicketAmount.record;
    cast r2 into r15 as u64;
    call credits.aleo/transfer_private r0 r6 r15 into r16 r17;
    call process_cap_record r1 r12 r3 into r18;
    cast self.caller r3 r18 into r19 as TicketAmountCap.record;
    async buy_private_with_cap r3 r4 r5 r6 into r20;
    output r13 as LaunchTicket.record;
    output r14 as BoughtTicketAmount.record;
    output r16 as credits.aleo/credits.record;
    output r17 as credits.aleo/credits.record;
    output r19 as TicketAmountCap.record;
    output r20 as aleopad_core_v0_3.aleo/buy_private_with_cap.future;

finalize buy_private_with_cap:
    input r0 as field.public;
    input r1 as u128.public;
    input r2 as u128.public;
    input r3 as address.public;
    get launches[r0] into r4;
    assert.eq r4.admin r3;
    assert.eq r4.credits_ratio_numerator r1;
    assert.eq r4.credits_ratio_denominator r2;
    lte r4.sell_start_block_height block.height into r5;
    add r4.sell_start_block_height r4.sell_duration_in_blocks into r6;
    gt r6 block.height into r7;
    and r5 r7 into r8;
    assert.eq r8 true;
    assert.eq r4.is_private_sells_enabled true;
    assert.eq r4.is_cap_enabled true;


function buy_public_without_cap:
    input r0 as field.private;
    input r1 as field.private;
    input r2 as u128.private;
    input r3 as u128.private;
    input r4 as address.private;
    gt r0 0field into r5;
    lte r0 340282366920938463463374607431768211455field into r6;
    and r5 r6 into r7;
    assert.eq r7 true;
    cast r0 into r8 as u64;
    call credits.aleo/transfer_public_to_private r4 r8 into r9 r10;
    cast r0 into r11 as u128;
    mul r11 r2 into r12;
    div r12 r3 into r13;
    cast self.caller r1 r13 into r14 as LaunchTicket.record;
    cast r4 r1 r13 into r15 as BoughtTicketAmount.record;
    cast r0 into r16 as u128;
    async buy_public_without_cap self.caller r16 r1 r4 r2 r3 r13 r10 into r17;
    output r14 as LaunchTicket.record;
    output r15 as BoughtTicketAmount.record;
    output r9 as credits.aleo/credits.record;
    output r17 as aleopad_core_v0_3.aleo/buy_public_without_cap.future;

finalize buy_public_without_cap:
    input r0 as address.public;
    input r1 as u128.public;
    input r2 as field.public;
    input r3 as address.public;
    input r4 as u128.public;
    input r5 as u128.public;
    input r6 as u128.public;
    input r7 as credits.aleo/transfer_public_to_private.future;
    await r7;
    get launches[r2] into r8;
    assert.eq r8.admin r3;
    lte r8.sell_start_block_height block.height into r9;
    add r8.sell_start_block_height r8.sell_duration_in_blocks into r10;
    gt r10 block.height into r11;
    and r9 r11 into r12;
    assert.eq r12 true;
    assert.eq r8.is_public_sells_enabled true;
    not r8.is_cap_enabled into r13;
    assert.eq r13 true;
    assert.eq r8.credits_ratio_numerator r4;
    assert.eq r8.credits_ratio_denominator r5;
    get.or_use public_launch_total_amounts[r2] 0u128 into r14;
    add r14 r6 into r15;
    set r15 into public_launch_total_amounts[r2];


function buy_public_with_cap:
    input r0 as TicketAmountCap.record;
    input r1 as field.private;
    input r2 as u128.private;
    input r3 as u128.private;
    input r4 as field.private;
    input r5 as address.private;
    gt r1 0field into r6;
    lte r1 18446744073709551615field into r7;
    and r6 r7 into r8;
    assert.eq r8 true;
    cast r1 into r9 as u128;
    mul r9 r2 into r10;
    div r10 r3 into r11;
    cast r1 into r12 as u64;
    call credits.aleo/transfer_public_to_private r5 r12 into r13 r14;
    call process_cap_record r0 r11 r4 into r15;
    cast self.caller r4 r15 into r16 as TicketAmountCap.record;
    cast self.caller r4 r11 into r17 as LaunchTicket.record;
    cast r5 r4 r11 into r18 as BoughtTicketAmount.record;
    async buy_public_with_cap self.caller r11 r4 r2 r3 r5 r14 into r19;
    output r17 as LaunchTicket.record;
    output r18 as BoughtTicketAmount.record;
    output r13 as credits.aleo/credits.record;
    output r16 as TicketAmountCap.record;
    output r19 as aleopad_core_v0_3.aleo/buy_public_with_cap.future;

finalize buy_public_with_cap:
    input r0 as address.public;
    input r1 as u128.public;
    input r2 as field.public;
    input r3 as u128.public;
    input r4 as u128.public;
    input r5 as address.public;
    input r6 as credits.aleo/transfer_public_to_private.future;
    await r6;
    get launches[r2] into r7;
    assert.eq r7.admin r5;
    assert.eq r7.credits_ratio_numerator r3;
    assert.eq r7.credits_ratio_denominator r4;
    lte r7.sell_start_block_height block.height into r8;
    add r7.sell_start_block_height r7.sell_duration_in_blocks into r9;
    gt r9 block.height into r10;
    and r8 r10 into r11;
    assert.eq r11 true;
    assert.eq r7.is_private_sells_enabled true;
    assert.eq r7.is_cap_enabled true;
    get.or_use public_launch_total_amounts[r2] 0u128 into r12;
    add r12 r1 into r13;
    set r13 into public_launch_total_amounts[r2];


function validate_claim:
    input r0 as LaunchTicket.record;
    gt r0.amount 0u128 into r1;
    assert.eq r1 true;
    async validate_claim r0.launch_id into r2;
    output r2 as aleopad_core_v0_3.aleo/validate_claim.future;

finalize validate_claim:
    input r0 as field.public;
    get launches[r0] into r1;
    gte block.height r1.claim_start_block_height into r2;
    assert.eq r2 true;
    is.eq r1.claim_duration_in_blocks 0u32 into r3;
    add r1.claim_start_block_height r1.claim_duration_in_blocks into r4;
    lt block.height r4 into r5;
    or r3 r5 into r6;
    assert.eq r6 true;


function issue_cap_to_user:
    input r0 as AleopadLaunchAdministartion.record;
    input r1 as address.private;
    input r2 as u128.private;
    cast r1 r0.launch_id r2 into r3 as TicketAmountCap.record;
    cast r1 r0.launch_id into r4 as CapIssueKey;
    commit.bhp256 r4 r0.cap_commit_rand into r5 as field;
    cast r0.owner r0.launch_id r0.cap_commit_rand into r6 as AleopadLaunchAdministartion.record;
    async issue_cap_to_user r5 r0.launch_id into r7;
    output r6 as AleopadLaunchAdministartion.record;
    output r3 as TicketAmountCap.record;
    output r7 as aleopad_core_v0_3.aleo/issue_cap_to_user.future;

finalize issue_cap_to_user:
    input r0 as field.public;
    input r1 as field.public;
    get.or_use issued_caps[r0] false into r2;
    not r2 into r3;
    assert.eq r3 true;
    set true into issued_caps[r0];
