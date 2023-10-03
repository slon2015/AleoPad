import { useEffect, useState } from "react";
import { getBlockHeight } from "../common";

type Response = {
  blockHeight?: number;
  loading: boolean;
  error?: string;
};

export function useBlockHeight(): Response {
  const [loading, setLoading] = useState(false);
  const [blockHeight, setBlockHeight] = useState<number | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  function readBlockHeight() {
    setLoading(true);
    setError(undefined);
    getBlockHeight()
      .then((height) => {
        setBlockHeight(height);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(String(err));
      });
  }

  useEffect(() => {
    readBlockHeight();
    const interval = setInterval(() => readBlockHeight(), 5000);

    return () => clearInterval(interval);
  }, []);

  return {
    blockHeight,
    loading,
    error,
  };
}
