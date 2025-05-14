import { openai } from "./openAiClient";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

const BASE_PROMPT = `
==========

Always focus on your goal.

If the user deviates from your goal, gently guide them back to it.

If the user mentions a topic completely unrelated to your goal, return a message that you are not able to help with that.

When providing content with links, do it simple as text.

==========
`.trim();

export async function handleMessage(
  message: string
): Promise<{
  email: string;
  message: string;
  subject: string;
  valid: boolean;
} | null> {
  try {
    const prompt = `${BASE_PROMPT}\n\n${message}`.trim();

    const userMessage: ChatMessage = {
      role: "user",
      content: prompt,
    };

    const response = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [userMessage],
      response_format: { type: "json_object" },
      temperature: 1.3,
      max_tokens: 1000,
    });

    const responseJson = response.choices[0]?.message?.content;

    if (!responseJson) {
      return null;
    }

    return JSON.parse(responseJson);
  } catch (error) {
    console.error("Error in handleMessage:", error);
    return null;
  }
}
