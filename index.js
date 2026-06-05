require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");

const { App } = require("@slack/bolt");
const axios = require("axios");
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_TOKEN });

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

app.command("/hbsc-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

app.command("/hbsc-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text: `Available Commands:
/hbsc-help - List available commands
/hbsc-ping - Check bot latency
/hbsc-joke - Get a Joke
/hbsc-sum [num1] [num2] - Get the sum of two numbers
/hbsc-gemini - [question?] - Ask Gemini a question
`,
  });
});

app.command("/hbsc-joke", async ({ ack, respond }) => {
  await ack();
  console.log("Fetching a joke...");
  try {
    const response = await axios.get(
      "https://official-joke-api.appspot.com/jokes/random",
    );
    await respond({
      text: `Joke: \n${response.data.setup}, ${response.data.punchline}`,
    });
    console.log(`joke: ${response.data.setup}`);
  } catch (err) {
    await respond({ text: "Failed to fetch a Joke (Partner Server Issue)." });
    console.log(err);
  }
});

app.command("/hbsc-sum", async ({ command, ack, respond }) => {
  await ack();

  const args = command.text.split(" ");

  const a = Number(args[0]);
  const b = Number(args[1]);

  if (isNaN(a) || isNaN(b)) {
    return respond(
      "I think you give me an invalid number please check your input and try again :) ❤️",
    );
  }

  await respond(`Result: ${a + b}`);
});

app.command("/hbsc-gemini", async ({ command, ack, respond, client }) => {
  await ack();
  console.log("Generating response from Gemini...");
  try {
    const question = command.text.trim();
    if (!question) {
      await respond(`I think you just call me! without any question :)`);
    }
    await respond("thinking....");

    await respond("Genrating Answer , Please wait");

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: question,
    });

    console.log(response);

    await respond(response.text);
  } catch (err) {
    respond("Ai Model is Overloaded try again!");
  }
});
(async () => {
  await app.start();
  console.log("bot is running!");
})();
