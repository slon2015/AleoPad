import aleopad_core_v0_2.aleo;
program aleopad_tokens_v0_2.aleo;


record PrivateToken:
    owner as address.private;
    token as field.private;
    amount as u128.private;

record AleopadTokenAdministration:
    owner as address.private;
    token as field.private;

struct TokenInfo:
    name as field;
    symbol as field;
    decimals as u8;

struct BalanceKeyData:
    token as field;
    user as address;

struct AllowanceKeyData:
    token as field;
    payer as address;
    spender as address;

struct TokenLaunchKeyData:
    token as field;
    launch as field;


mapping balances:
	key as field.public;
	value as u128.public;


mapping allowance:
	key as field.public;
	value as u128.public;


mapping tokens:
	key as field.public;
	value as TokenInfo.public;


mapping token_launches:
	key as field.public;
	value as boolean.public;


mapping launches:
	key as field.public;
	value as boolean.public;


mapping launch_tokens:
	key as field.public;
	value as field.public;

function create_token:
    input r0 as field.public;
    input r1 as field.public;
    input r2 as field.public;
    input r3 as u8.public;
    input r4 as address.private;
    gt r1 0field into r5;
    assert.eq r5 true;
    cast r4 r0 into r6 as AleopadTokenAdministration.record;
    async create_token r0 r1 r2 r3 self.caller into r7;
    output r6 as AleopadTokenAdministration.record;
    output r7 as aleopad_tokens_v0_2.aleo/create_token.future;

finalize create_token:
    input r0 as field.public;
    input r1 as field.public;
    input r2 as field.public;
    input r3 as u8.public;
    input r4 as address.public;
    contains tokens[r0] into r5;
    not r5 into r6;
    assert.eq r6 true;
    cast r1 r2 r3 into r7 as TokenInfo;
    set r7 into tokens[r0];




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
    async create_token_with_launch r0 r4 r1 r2 r3 self.caller into r8;
    output r7 as AleopadTokenAdministration.record;
    output r8 as aleopad_tokens_v0_2.aleo/create_token_with_launch.future;

finalize create_token_with_launch:
    input r0 as field.public;
    input r1 as field.public;
    input r2 as field.public;
    input r3 as field.public;
    input r4 as u8.public;
    input r5 as address.public;
    contains tokens[r0] into r6;
    not r6 into r7;
    assert.eq r7 true;
    cast r2 r3 r4 into r8 as TokenInfo;
    set r8 into tokens[r0];
    contains launches[r1] into r9;
    not r9 into r10;
    assert.eq r10 true;
    cast r0 r1 into r11 as TokenLaunchKeyData;
    hash.bhp256 r11 into r12 as field;
    set true into token_launches[r12];
    set true into launches[r1];
    set r0 into launch_tokens[r1];




function transfer_public:
    input r0 as field.public;
    input r1 as address.public;
    input r2 as u128.public;
    async transfer_public r0 self.caller r1 r2 into r3;
    output r3 as aleopad_tokens_v0_2.aleo/transfer_public.future;

finalize transfer_public:
    input r0 as field.public;
    input r1 as address.public;
    input r2 as address.public;
    input r3 as u128.public;
    contains tokens[r0] into r4;
    assert.eq r4 true;
    cast r0 r1 into r5 as BalanceKeyData;
    hash.bhp256 r5 into r6 as field;
    get balances[r6] into r7;
    sub r7 r3 into r8;
    set r8 into balances[r6];
    cast r0 r2 into r9 as BalanceKeyData;
    hash.bhp256 r9 into r10 as field;
    get.or_use balances[r10] 0u128 into r11;
    add r11 r3 into r12;
    set r12 into balances[r10];




function approve:
    input r0 as field.public;
    input r1 as address.public;
    input r2 as u128.public;
    async approve r0 self.caller r1 r2 into r3;
    output r3 as aleopad_tokens_v0_2.aleo/approve.future;

finalize approve:
    input r0 as field.public;
    input r1 as address.public;
    input r2 as address.public;
    input r3 as u128.public;
    contains tokens[r0] into r4;
    assert.eq r4 true;
    cast r0 r1 r2 into r5 as AllowanceKeyData;
    hash.bhp256 r5 into r6 as field;
    set r3 into allowance[r6];


function transfer_from:
    input r0 as field.public;
    input r1 as address.public;
    input r2 as address.public;
    input r3 as u128.public;
    async transfer_from self.caller r0 r1 r2 r3 into r4;
    output r4 as aleopad_tokens_v0_2.aleo/transfer_from.future;

finalize transfer_from:
    input r0 as address.public;
    input r1 as field.public;
    input r2 as address.public;
    input r3 as address.public;
    input r4 as u128.public;
    contains tokens[r1] into r5;
    assert.eq r5 true;
    cast r1 r2 r0 into r6 as AllowanceKeyData;
    hash.bhp256 r6 into r7 as field;
    get allowance[r7] into r8;
    sub r8 r4 into r9;
    set r9 into allowance[r7];
    cast r1 r2 into r10 as BalanceKeyData;
    hash.bhp256 r10 into r11 as field;
    get balances[r11] into r12;
    sub r12 r4 into r13;
    set r13 into balances[r11];
    cast r1 r3 into r14 as BalanceKeyData;
    hash.bhp256 r14 into r15 as field;
    get.or_use balances[r15] 0u128 into r16;
    add r16 r4 into r17;
    set r17 into balances[r15];


function transfer_public_to_private:
    input r0 as field.public;
    input r1 as address.private;
    input r2 as u128.public;
    cast r1 r0 r2 into r3 as PrivateToken.record;
    hash.bhp256 r3 into r4 as field;
    async transfer_public_to_private r0 self.caller r2 into r5;
    output r3 as PrivateToken.record;
    output r5 as aleopad_tokens_v0_2.aleo/transfer_public_to_private.future;

finalize transfer_public_to_private:
    input r0 as field.public;
    input r1 as address.public;
    input r2 as u128.public;
    contains tokens[r0] into r3;
    assert.eq r3 true;
    cast r0 r1 into r4 as BalanceKeyData;
    hash.bhp256 r4 into r5 as field;
    get balances[r5] into r6;
    sub r6 r2 into r7;
    set r7 into balances[r5];


function transfer_private_to_public:
    input r0 as PrivateToken.record;
    input r1 as address.public;
    input r2 as u128.public;
    sub r0.amount r2 into r3;
    cast r0.owner r0.token r3 into r4 as PrivateToken.record;
    async transfer_private_to_public r0.token r1 r2 into r5;
    output r4 as PrivateToken.record;
    output r5 as aleopad_tokens_v0_2.aleo/transfer_private_to_public.future;

finalize transfer_private_to_public:
    input r0 as field.public;
    input r1 as address.public;
    input r2 as u128.public;
    contains tokens[r0] into r3;
    assert.eq r3 true;
    cast r0 r1 into r4 as BalanceKeyData;
    hash.bhp256 r4 into r5 as field;
    get.or_use balances[r5] 0u128 into r6;
    add r6 r2 into r7;
    set r7 into balances[r5];


function transfer_private:
    input r0 as PrivateToken.record;
    input r1 as address.private;
    input r2 as u128.private;
    cast r1 r0.token r2 into r3 as PrivateToken.record;
    sub r0.amount r2 into r4;
    cast r0.owner r0.token r4 into r5 as PrivateToken.record;
    output r3 as PrivateToken.record;
    output r5 as PrivateToken.record;


function join:
    input r0 as PrivateToken.record;
    input r1 as PrivateToken.record;
    assert.eq r0.token r1.token;
    add r0.amount r1.amount into r2;
    cast r0.owner r0.token r2 into r3 as PrivateToken.record;
    output r3 as PrivateToken.record;


function enable_launch:
    input r0 as AleopadTokenAdministration.record;
    input r1 as field.private;
    cast r0.owner r0.token into r2 as AleopadTokenAdministration.record;
    async enable_launch r0.token r1 into r3;
    output r2 as AleopadTokenAdministration.record;
    output r3 as aleopad_tokens_v0_2.aleo/enable_launch.future;

finalize enable_launch:
    input r0 as field.public;
    input r1 as field.public;
    contains launches[r1] into r2;
    not r2 into r3;
    assert.eq r3 true;
    contains tokens[r0] into r4;
    assert.eq r4 true;
    cast r0 r1 into r5 as TokenLaunchKeyData;
    hash.bhp256 r5 into r6 as field;
    set true into token_launches[r6];
    set true into launches[r1];
    set r0 into launch_tokens[r1];


function claim_private:
    input r0 as field.private;
    input r1 as aleopad_core_v0_2.aleo/LaunchTicket.record;
    cast r1.owner r0 r1.amount into r2 as PrivateToken.record;
    call aleopad_core_v0_2.aleo/validate_private_claim r1 into r3;
    async claim_private r3 r0 r1.launch_id into r4;
    output r2 as PrivateToken.record;
    output r4 as aleopad_tokens_v0_2.aleo/claim_private.future;

finalize claim_private:
    input r0 as aleopad_core_v0_2/validate_private_claim;
    input r1 as field.public;
    input r2 as field.public;
    await r0;
    cast r1 r2 into r3 as TokenLaunchKeyData;
    hash.bhp256 r3 into r4 as field;
    get token_launches[r4] into r5;
    assert.eq r5 true;


function claim_public:
    input r0 as field.private;
    input r1 as field.private;
    input r2 as u128.private;
    call aleopad_core_v0_2.aleo/validate_public_claim r1 r2 into r3;
    async claim_public r3 r0 r1 self.caller r2 into r4;
    output r4 as aleopad_tokens_v0_2.aleo/claim_public.future;

finalize claim_public:
    input r0 as aleopad_core_v0_2/validate_public_claim;
    input r1 as field.public;
    input r2 as field.public;
    input r3 as address.public;
    input r4 as u128.public;
    await r0;
    cast r1 r2 into r5 as TokenLaunchKeyData;
    hash.bhp256 r5 into r6 as field;
    get token_launches[r6] into r7;
    assert.eq r7 true;
    cast r1 r3 into r8 as BalanceKeyData;
    hash.bhp256 r8 into r9 as field;
    get.or_use balances[r9] 0u128 into r10;
    add r10 r4 into r11;
    set r11 into balances[r9];
