import { tokens } from "shared/db";
import { fieldToText, normalizeFieldId, getTokenById } from "shared/web3";
import { useEffect, useState } from "react";

import { Token } from "shared/db";

type TokenState = {
  token?: Token;
  loading: boolean;
  error?: string;
};

export function useToken(id?: string): TokenState {
  const normalizedId = id ? normalizeFieldId(id) : undefined;
  const [token, setToken] = useState(() =>
    normalizedId ? tokens.load().find((t) => t.id === normalizedId) : undefined
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (normalizedId) {
      setToken(tokens.load().find((t) => t.id === normalizedId));
    }
  }, [normalizedId]);

  useEffect(() => {
    if (!token && normalizedId) {
      setLoading(true);
      setError(undefined);
      getTokenById(normalizedId)
        .then((fetched) => {
          const mappedToken = {
            id: normalizeFieldId(fetched.id),
            decimals: fetched.decimals,
            name: fieldToText(fetched.name),
            symbol: fieldToText(fetched.symbol),
          };
          tokens.append(mappedToken);
          setToken(mappedToken);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setError(String(err));
        });
    }
  }, [token, normalizedId]);

  return {
    token,
    loading,
    error,
  };
}
