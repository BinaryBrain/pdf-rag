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
