import aleopad_core_v0_1.aleo;
import aleopad_tokens_v0_1.aleo;
program aleopad_management_v0_1.aleo;






struct PublicLaunchParams:
    launch_id as field;
    launch_admin as address;
    sell_start_block_height as u32;
    sell_duration_in_blocks as u32;
    claim_start_block_height as u32;
    claim_duration_in_blocks as u32;
    credits_ratio_numerator as u128;
    credits_ratio_denominator as u128;
    is_private_sells_enabled as boolean;
    is_public_sells_enabled as boolean;
    is_cap_enabled as boolean;

struct PublicTokenParams:
    token_id as field;
    name as field;
    symbol as field;
    decimals as u8;


function set_up_new_regular_token:
    input r0 as PublicLaunchParams.public;
    input r1 as scalar.private;
    input r2 as PublicTokenParams.public;
    input r3 as address.private;
    call aleopad_core_v0_1.aleo/create_launch r0.launch_id r0.launch_admin r0.sell_start_block_height r0.sell_duration_in_blocks r0.claim_start_block_height r0.claim_duration_in_blocks r0.credits_ratio_numerator r0.credits_ratio_denominator r0.is_private_sells_enabled r0.is_public_sells_enabled r0.is_cap_enabled r1 into r4 r5;
    call aleopad_tokens_v0_1.aleo/create_token_with_launch r2.token_id r2.name r2.symbol r2.decimals r0.launch_id r3 into r6 r7;

    async set_up_new_regular_token r5 r7 into r8;

    output r6 as aleopad_tokens_v0_1.aleo/AleopadTokenAdministration.record;
    output r4 as aleopad_core_v0_1.aleo/AleopadLaunchAdministartion.record;
    output r8 as aleopad_management_v0_1.aleo/set_up_new_regular_token.future;

finalize set_up_new_regular_token:
    input r0 as aleopad_core_v0_1.aleo/create_launch.future;
    input r1 as aleopad_tokens_v0_1.aleo/create_token_with_launch.future;
    await r0;
    await r1;


function set_up_new_custom_token:
    input r0 as PublicLaunchParams.public;
    input r1 as scalar.private;
    call aleopad_core_v0_1.aleo/create_launch r0.launch_id r0.launch_admin r0.sell_start_block_height r0.sell_duration_in_blocks r0.claim_start_block_height r0.claim_duration_in_blocks r0.credits_ratio_numerator r0.credits_ratio_denominator r0.is_private_sells_enabled r0.is_public_sells_enabled r0.is_cap_enabled r1 into r2 r3;
    async set_up_new_custom_token r3 into r4;
    output r2 as aleopad_core_v0_1.aleo/AleopadLaunchAdministartion.record;
    output r4 as aleopad_management_v0_1.aleo/set_up_new_custom_token.future;

finalize set_up_new_custom_token:
    input r0 as aleopad_core_v0_1.aleo/create_launch.future;
    await r0;
