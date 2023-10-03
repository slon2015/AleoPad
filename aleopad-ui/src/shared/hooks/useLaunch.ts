import { launches, Launch } from "shared/db";
import { normalizeFieldId, getLaunchById } from "shared/web3";
import { useEffect, useState } from "react";

type LaunchState = {
  launch?: Launch;
  loading: boolean;
  error?: string;
};

export function useLaunch(id: string): LaunchState {
  const normalizedId = normalizeFieldId(id);
  const [launch, setLaunch] = useState(() =>
    launches.load().find((t) => t.id === normalizedId)
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!launch) {
      setLoading(true);
      setError(undefined);
      getLaunchById(normalizedId)
        .then((fetched) => {
          const mappedLaunch: Launch = {
            id: normalizedId,
            adminAddress: fetched.adminAddress,
            sellStartBlock: fetched.sellStartBlock,
            sellBlockDuration: fetched.sellBlockDuration,
            claimStartBlock: fetched.claimStartBlock,
            claimBlockDuration: fetched.claimBlockDuration,
            numerator: fetched.numerator.toFixed(),
            denominator: fetched.denominator.toFixed(),
            flags: fetched.flags,
            tokenId: fetched.tokenId
              ? normalizeFieldId(fetched.tokenId)
              : undefined,
          };
          launches.append(mappedLaunch);
          setLaunch(mappedLaunch);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setError(String(err));
        });
    }
  }, [launch, normalizedId]);

  return {
    launch,
    loading,
    error,
  };
}
