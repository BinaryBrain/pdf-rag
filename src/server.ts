import Fastify from "fastify";
import cors from '@fastify/cors';
import { SearchResult, getVector, loadVectors, search } from "./embeddings";
import { chat } from "./prompt";

async function main() {
  loadVectors();

  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, { 
    // put your options here
  });

  fastify.post("/prompt", async (request, reply) => {
    const prompt = request.body["prompt"];
    const vector = await getVector(prompt);
    const searchResult: SearchResult = search(vector);
    const res = await chat(prompt, searchResult.result);
    reply.send({ text: res, sources: searchResult.sources });
  });

  fastify.listen({ port: 3000 }, (err, address) => {
    if (err) {
      console.error(err);
      throw err;
    }

    console.log(`Server is now listening on ${address}`);
  });
}

main();
