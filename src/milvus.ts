import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({ address: "localhost:19530", ssl: false });

const collection_name = "helloVector";

async function storeVector(vector: number[], text: string) {
  const fields_data = [{ vector, text }];
  await client.upsert({
    collection_name,
    fields_data,
  });
}
