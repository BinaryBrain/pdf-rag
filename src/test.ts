import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
  const completion = await openai.chat.completions.create({
      model: "gpt-4",
      stream: true,
      messages: [
        {
          content: "Once upon a time",
          role: "user"
        }
      ]
    });

    for await (const chunk of completion) {
      const [choice] = chunk.choices;
      const { content } = choice.delta;
      console.log(content);
    }
}


main();

// import OpenAI from "openai";


// async function main () {
// const openai = new OpenAI();

// const stream = await openai.chat.completions.create({
//     model: "gpt-3.5-turbo",
//     messages: [{ role: "user", content: "Write me a story" }],
//     stream: true,
// });
// console.log(123123123)
// for await (const chunk of stream) {
//   console.log(chunk)
// }
// console.log(123123123)
// }
// main();