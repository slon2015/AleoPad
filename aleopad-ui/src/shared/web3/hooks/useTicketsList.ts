import { useQuery } from "react-query";
import { useLaunchesList } from "./useLaunchesList";
import { useWallet } from "./useWallet";
import { TicketRecord, getTicketsList } from "../wallet";
import {
  ConnectedWalletContextState,
  OnchainTicketRecord,
  ParsedLaunch,
} from "../types";
import {
  U128,
  cleanupVisibilityModifier,
  normalizeField,
  parsePrimitiveType,
} from "../common";
import { useMemo } from "react";

const TICKETS_LIST_QUERY_KEY = ["get", "tickets", "list"];

export type TicketItem = TicketRecord & {
  launch: ParsedLaunch;
};

type TicketsListResponse =
  | {
      loading: true;
    }
  | {
      loading: false;
      items: Array<TicketItem>;
    };

function mapToItem(
  launches: Array<ParsedLaunch>,
  ticket: OnchainTicketRecord
): Partial<TicketItem> {
  const launch = launches.find(
    (l) =>
      normalizeField(l.id) === cleanupVisibilityModifier(ticket.data.launch_id)
  );

  return {
    launch,
    amount: parsePrimitiveType(ticket.data.amount) as U128,
    id: ticket.id,
    onchainRecord: ticket,
  };
}

function filterItem(item: Partial<TicketItem>): boolean {
  return Boolean(item.launch);
}

export function useTicketsList(): TicketsListResponse {
  const launches = useLaunchesList();
  const wallet = useWallet();

  const tickets = useQuery({
    queryKey: TICKETS_LIST_QUERY_KEY,
    enabled: wallet.connected,
    queryFn: () => getTicketsList(wallet as ConnectedWalletContextState),
  });

  const items: Array<TicketItem> = useMemo(() => {
    if (tickets.isSuccess && launches.isSuccess) {
      return tickets.data
        .map((t) => mapToItem(launches.data, t))
        .filter(filterItem)
        .map((i) => i as TicketItem);
    }
    return [];
  }, [launches, tickets]);

  if (launches.isLoading || tickets.isLoading) {
    return {
      loading: true,
    };
  } else {
    return {
      loading: false,
      items,
    };
  }
}
