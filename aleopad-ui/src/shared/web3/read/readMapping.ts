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

type MappingValueList = Record<string, ListValueItem>;

type ListValueItem = {
  key: string;
  value: string;
  value_id: string;
};

export async function getAllPropgramMappingValues(
  programId: string,
  mappingName: string
): Promise<Array<ListValueItem>> {
  const outdatedFlagPostfix =
    "REACT_APP_HARUKA_EXPLORER_OUTDATED_FLAG" in process.env
      ? "?outdated=1"
      : "";

  const response = await axios({
    baseURL: process.env.REACT_APP_HARUKA_EXPLORER_API_URL!,
    url: `mapping/list_program_mapping_values/${programId}/${mappingName}${outdatedFlagPostfix}`,
  });

  if (response.status !== 200) {
    throw new Error(`Haruka explorer response status ${response.status}`);
  }

  const result: MappingValueList = response.data;

  return Array.from(Object.values(result));
}
