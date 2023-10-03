import { useEffect, useState } from "react";
import { useBlockHeight } from "./useBlockHeight";
import axios from "axios";
import moment from "moment";

type Block = {
  header: {
    metadata: {
      timestamp: number;
    };
  };
};

function meanBlockTime(blocks: Array<Block>): number {
  debugger;
  let sum = 0;
  for (let index = 1; index < blocks.length; index++) {
    const prevBlock = blocks[index - 1];
    const block = blocks[index];

    const diffInSeconds = moment
      .duration(
        moment
          .unix(block.header.metadata.timestamp)
          .diff(moment.unix(prevBlock.header.metadata.timestamp))
      )
      .asSeconds();

    sum += Math.abs(diffInSeconds);
  }

  return sum / (blocks.length - 1);
}

type Response = {
  meanBlockTimeInSeconds?: number;
  blockHeight?: number;
  loading: boolean;
  error?: string;
};

export function useMeanBlockTime(): Response {
  const {
    blockHeight,
    loading: heightLoading,
    error: heightError,
  } = useBlockHeight();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [meanBlockTimeInSeconds, setMeanBlockTimeInSeconds] = useState<
    number | undefined
  >();

  useEffect(() => {
    if (blockHeight) {
      setLoading(true);
      axios({
        baseURL: process.env.REACT_APP_READ_RPC_URL,
        url: `blocks?start=${blockHeight - 50}&end=${blockHeight}`,
      })
        .then((response) => {
          if (response.status !== 200) {
            setError(
              `Mean block time fetch error. Response status ${response.status}`
            );
            return;
          }

          setMeanBlockTimeInSeconds(meanBlockTime(response.data));
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setError(err);
        });
    }
  }, [blockHeight]);

  return {
    error: heightError || error || undefined,
    loading: loading || heightLoading,
    blockHeight,
    meanBlockTimeInSeconds,
  };
}
