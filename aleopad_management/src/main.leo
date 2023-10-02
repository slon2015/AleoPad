import aleopad_core_v0_1.leo;
import aleopad_tokens_v0_1.leo;

// The 'aleopad_management_v0_1' program.
program aleopad_management_v0_1.aleo {

    struct PublicLaunchParams {
        launch_id: field,
        launch_admin: address,
        sell_start_block_height: u32, 
        sell_duration_in_blocks: u32, 
        claim_start_block_height: u32,
        claim_duration_in_blocks: u32,
        credits_ratio_numerator: u128,
        credits_ratio_denominator: u128,
        is_private_sells_enabled: bool,
        is_public_sells_enabled: bool,
        is_cap_enabled: bool,
    }

    struct PublicTokenParams {
        token_id: field, 
        name: field,
        symbol: field,
        decimals: u8,
    }

    transition set_up_new_regular_token(
        public launch_params: PublicLaunchParams,
        cap_commit_rand: scalar,
        public token_params: PublicTokenParams,
        token_admin: address
    ) -> (aleopad_tokens_v0_1.leo/AleopadTokenAdministration, aleopad_core_v0_1.leo/AleopadLaunchAdministartion) {
        let launch: AleopadLaunchAdministartion = aleopad_core_v0_1.leo/create_launch(
            launch_params.launch_id,
            launch_params.launch_admin,
            launch_params.sell_start_block_height, 
            launch_params.sell_duration_in_blocks, 
            launch_params.claim_start_block_height,
            launch_params.claim_duration_in_blocks,
            launch_params.credits_ratio_numerator,
            launch_params.credits_ratio_denominator,
            launch_params.is_private_sells_enabled,
            launch_params.is_public_sells_enabled,
            launch_params.is_cap_enabled,
            cap_commit_rand
        );

        let token: AleopadTokenAdministration = aleopad_tokens_v0_1.leo/create_token_with_launch(
            token_params.token_id, 
            token_params.name,
            token_params.symbol,
            token_params.decimals,
            launch_params.launch_id,
            token_admin
        );

        return (token, launch);
    }

    transition set_up_new_custom_token(
        public launch_params: PublicLaunchParams,
        cap_commit_rand: scalar
    ) -> (aleopad_core_v0_1.leo/AleopadLaunchAdministartion) {
        let launch: AleopadLaunchAdministartion = aleopad_core_v0_1.leo/create_launch(
            launch_params.launch_id,
            launch_params.launch_admin,
            launch_params.sell_start_block_height, 
            launch_params.sell_duration_in_blocks, 
            launch_params.claim_start_block_height,
            launch_params.claim_duration_in_blocks,
            launch_params.credits_ratio_numerator,
            launch_params.credits_ratio_denominator,
            launch_params.is_private_sells_enabled,
            launch_params.is_public_sells_enabled,
            launch_params.is_cap_enabled,
            cap_commit_rand
        );

        return launch;
    }
}
