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

async function fetchMeanBlockTime(height: number): Promise<number> {
  const response = await axios({
    baseURL: process.env.REACT_APP_READ_RPC_URL,
    url: `blocks?start=${height - 50}&end=${height}`,
  });

  return meanBlockTime(response.data);
}

export async function getMeanBlockTime(blockHeight: number): Promise<number> {
  return fetchMeanBlockTime(blockHeight);
}
