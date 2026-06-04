require("dotenv").config();

const { App } = require("@slack/bolt");
const axios = require("axios");

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    appToken: process.env.SLACK_APP_TOKEN,
    socketMode: true
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
        text:
            `Available Commands:
/hbsc-help - List available commands
/hbsc-ping - Check bot latency
/hbsc-joke - Get a Joke`
    });
});

app.command("/hbsc-joke", async ({ ack, respond }) => {
    await ack();
    console.log("Fetching a joke...");
    try {
        const response = await axios.get("https://official-joke-api.appspot.com/jokes/random");
        await respond({ text: `Joke:\n${response.data.setup},  ${response.data.punchline}` });
        console.log(`joke:${response.data.setup}`)
    } catch (err) {
        await respond({ text: "Failed to fetch a Joke (Partner Server Issue)." });
        console.log(err);
    }
});


(async () => {
    await app.start();
    console.log("bot is running!");
})();