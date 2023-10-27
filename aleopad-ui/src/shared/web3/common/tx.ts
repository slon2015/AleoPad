import axios, { HttpStatusCode } from "axios";

const DEFAULT_TX_TIMEOUT = 60;
const DEFAULT_TX_DELAY = 1000;

export class TxTimeoutError extends Error {
  constructor(public readonly txId: string) {
    super(`Tx awaiting timeout for tx: ${txId}`);
  }
}

class TxNotFoundError extends Error {
  constructor(public readonly txId: string) {
    super(`Tx with id ${txId} not found`);
  }
}
class InvalidTxIdError extends Error {
  constructor(public readonly txId: string) {
    super(`Invalid checksum for tx id ${txId}`);
  }
}

async function fetchTx(txId: string) {
  const response = await axios({
    baseURL: process.env.REACT_APP_READ_RPC_URL,
    url: `transaction/${txId}`,
  });

  if (response.status === HttpStatusCode.InternalServerError) {
    const responseBody: string = response.data;

    if (responseBody.includes("Missing transaction")) {
      throw new TxNotFoundError(txId);
    }
    if (responseBody.includes("invalid checksum")) {
      throw new InvalidTxIdError(txId);
    }
    throw new Error("Invalid response for tx");
  } else if (response.status === HttpStatusCode.Ok) {
    return response.data;
  } else {
    throw new Error(
      `Invalid response status ${response.status} for tx request`
    );
  }
}

class TimerIterable<T> {
  constructor(public readonly timeoutMs: number, private readonly value: T) {}
  [Symbol.asyncIterator]() {
    const timeout = this.timeoutMs;
    const val = this.value;
    return {
      async next() {
        await new Promise((resolve) => setTimeout(resolve, timeout));
        return { done: true, value: val };
      },
    };
  }
}

export async function awaitTx(
  txId: string,
  timeoutInSeconds: number = DEFAULT_TX_TIMEOUT
) {
  for await (const startTime of new TimerIterable(
    DEFAULT_TX_DELAY,
    Date.now()
  )) {
    if (startTime + timeoutInSeconds * 1000 < Date.now()) {
      throw new TxTimeoutError(txId);
    }

    try {
      return fetchTx(txId);
    } catch (err: unknown) {
      if (!(err instanceof TxNotFoundError)) {
        throw err;
      }
    }
  }
}
