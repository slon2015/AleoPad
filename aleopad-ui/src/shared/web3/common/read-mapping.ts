import axios from "axios";

export async function getPropgramMapping(
  programId: string,
  mappingName: string,
  key: string
): Promise<string | null> {
  const response = await axios({
    baseURL: process.env.REACT_APP_READ_RPC_URL,
    url: `program/${programId}/mapping/${mappingName}/${key}`,
  });

  if (response.status !== 200) {
    throw new Error(`RPC response status ${response.status}`);
  }

  const responseText: string = response.data;
  if (responseText == null || responseText.trim() === "null") {
    return null;
  }

  return responseText;
}
