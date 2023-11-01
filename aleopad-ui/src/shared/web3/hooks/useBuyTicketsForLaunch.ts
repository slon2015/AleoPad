import { useMutation, useQueryClient, UseMutationResult } from "react-query";
import { useCreditsAmounts } from "./useCreditsAmounts";
import { useWallet } from "./useWallet";
import { Field, U128, U64 } from "../common";
import { buyTicket } from "../write";
import { useLaunch } from "./useLaunch";
import { capQueryKey, useCapForLaunch } from "./useCapForLaunch";
import { ConnectedWalletContextState, ParsedLaunch } from "../types";
import { CreditAmounts, CreditsRecord } from "../wallet";
import { useEffect, useMemo, useState } from "react";

type BuyTicketMethods =
  | {
      launch: ParsedLaunch;
      amounts: CreditAmounts;
      loading: false;
      readonly selectedPayment?: "public" | CreditsRecord;
      setSelectedPayment(payment: "public" | CreditsRecord): void;
      readonly creditsAmount: U128;
      setCreditsAmount(amount: U128): void;
      mutation: UseMutationResult<void, Error, void, unknown>;
      getBlocker(): string | undefined;
      enabled: boolean;
    }
  | {
      loading: true;
    };

export function useBuyTickets(launchId: string | Field): BuyTicketMethods {
  const wallet = useWallet();

  const launch = useLaunch(launchId);
  const cap = useCapForLaunch(launchId);

  const queryClient = useQueryClient();
  const { amounts } = useCreditsAmounts();

  const [selectedPayment, setSelectedPayment] = useState<
    "public" | CreditsRecord | undefined
  >();
  const [creditsAmount, setCreditsAmount] = useState<U64>(new U64(0));

  useEffect(() => {
    if (!selectedPayment && launch.data) {
      if (launch.data.flags.isPublicSellsEnabled) {
        setSelectedPayment("public");
      } else if (amounts && amounts.privateRecords.length > 0) {
        setSelectedPayment(amounts.privateRecords[0]);
      }
    }
  }, [launch.data, amounts, selectedPayment]);

  const context = useMemo(() => {
    if (launch.data && (cap.isSuccess || !launch.data.flags.isCapEnabled)) {
      if (selectedPayment === "public") {
        return buyTicket.createPublicContext(
          launch.data,
          creditsAmount,
          cap.data
        );
      }
      if (typeof selectedPayment === "object" && amounts?.privateRecords) {
        return buyTicket.createPrivateContext(
          launch.data,
          creditsAmount,
          selectedPayment,
          amounts.privateRecords
        );
      }
    }
  }, [selectedPayment, amounts, cap, launch.data, creditsAmount]);

  const onSuccess = async () => {
    await queryClient.invalidateQueries("creditsAmounts");
    await queryClient.invalidateQueries(capQueryKey(launchId));
  };

  const checkPublicEnabled = () =>
    Boolean(
      launch.data &&
        launch.data.flags.isPublicSellsEnabled &&
        amounts?.publicAmount &&
        context &&
        wallet.connected
    );

  const getPublicBlocker = () => {
    if (checkPublicEnabled()) {
      return buyTicket.check(context!, amounts!.publicAmount);
    }
  };

  const publicMutation = useMutation<void, Error>(
    async () => {
      if (checkPublicEnabled()) {
        return buyTicket.buy(
          context!,
          wallet as ConnectedWalletContextState,
          launch.data!,
          amounts!.publicAmount
        );
      }
    },
    {
      mutationKey: ["buy", "public", launchId],
      onSuccess,
    }
  );

  const checkPrivateEnabled = () =>
    Boolean(
      wallet.connected &&
        launch.data &&
        launch.data.flags.isPrivateSellsEnabled &&
        amounts &&
        context
    );

  const getPrivateBlocker = () => {
    if (checkPrivateEnabled()) {
      return buyTicket.check(context!, amounts!.publicAmount);
    }
  };

  const privateMutation = useMutation<void, Error>(
    async () => {
      if (checkPrivateEnabled()) {
        return buyTicket.buy(
          context!,
          wallet as ConnectedWalletContextState,
          launch.data!
        );
      }
    },
    {
      mutationKey: ["buy", "private", launchId],
      onSuccess,
    }
  );

  if (!launch.data || cap.isLoading || !amounts) {
    return {
      loading: true,
    };
  }

  return {
    loading: false,
    creditsAmount,
    setCreditsAmount,
    selectedPayment,
    setSelectedPayment,
    amounts,
    launch: launch.data,
    getBlocker:
      selectedPayment === "public" ? getPublicBlocker : getPrivateBlocker,
    mutation: selectedPayment === "public" ? publicMutation : privateMutation,
    enabled:
      selectedPayment === "public"
        ? checkPublicEnabled()
        : checkPrivateEnabled(),
  };
}
