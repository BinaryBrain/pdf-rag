import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources";

const openai = new OpenAI();

export async function chat(prompt: string, documents: string): Promise<string> {
  const messages: ChatCompletionMessageParam[] = [{
    role: "system",
    content:
    "You're an expert assistant and you try to answer the user as best as possible without \
    inventing things. You base your knowledge on the documents the user provides you."
  },
  {
    role: "user",
    content: `Here is the page of a PDF file that may help you: \n${documents}`
  },
  {
    role: "user",
    content: prompt
  }];

  const completion = await openai.chat.completions.create({
    model: "gpt-4-1106-preview",
    messages,
  });

  console.log(completion.choices[0].message);
  return completion.choices[0].message.content;
}
