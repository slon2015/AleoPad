import axios from "axios";

export async function getBlockHeight(): Promise<number> {
  const response = await axios({
    baseURL: process.env.REACT_APP_READ_RPC_URL,
    url: `latest/height`,
  });

  if (!response.data) {
    throw new Error("Unable to fetch current block height");
  }

  return Number.parseInt(response.data);
}
