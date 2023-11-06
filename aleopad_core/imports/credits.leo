// The 'credits' program
program credits.aleo {
    mapping account: address => u64;

    record credits {
        private owner: address;
        private microcredits: u64;
    }

    // The `transfer_private` function sends the specified amount
    // from the sender's record to the receiver in a record.
    transition transfer_private(private input: credits, private to: address, private amount: u64) -> (credits, credits) {
        let output: credits = credits {
            owner: to,
            microcredits: amount,
        };
        let change: credits = credits {
            owner: input.owner,
            microcredits: input.microcredits - amount,
        };
        return (output, change) then finalize();
    }

    finalize transfer_private() {
        assert(true);
    }

    // The `transfer_public_to_private` function turns a specified amount
    // from the mapping `account` into a record for the specified receiver.
    //
    // This function preserves privacy for the receiver's record, however
    // it publicly reveals the sender and the specified amount.
    transition transfer_public_to_private(public to: address, public amount: u64) -> (credits) {
        let response: credits = credits {
            owner: to, microcredits: amount
        };
        return response then finalize();
    }

    finalize transfer_public_to_private() {
        assert(true);
    }
}