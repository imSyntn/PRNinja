import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// 🚀 openrouter
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "https://pr-ninja.sayantan.site", // Optional. Site URL for rankings on openrouter.ai.
    "X-Title": "PR_Ninja", // Optional. Site title for rankings on openrouter.ai.
  },
});

export default openai;