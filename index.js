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
    text: `🤖 SlackBot HackClub Commands

📌 Utility
/hbsc-help - Show all commands
/hbsc-ping - Check bot latency

🧮 Calculator
/hbsc-sum [a] [b] - Add two numbers
/hbsc-minus [a] [b] - Subtract two numbers
/hbsc-multiply [a] [b] - Multiply two numbers
/hbsc-divide [a] [b] - Divide two numbers

🎭 Fun
/hbsc-joke - Random joke
/hbsc-funfact - Random fun fact
/hbsc-meme - Random meme
/hbsc-coinflip - Flip a coin

🌍 Information
/hbsc-weather [city] - Weather report for a city

🧠 AI
/hbsc-gemini [question] - Ask Gemini AI

Made by Rivaan Maurya 🚀`
  });
});

app.command("/hbsc-minus", async ({ command, ack, respond }) => {
  await ack();

  const args = command.text.split(" ");

  const a = Number(args[0]);
  const b = Number(args[1]);

  if (isNaN(a) || isNaN(b)) {
    return respond("❌ Invalid numbers.");
  }

  await respond(`Result: ${a - b}`);
});



app.command("/hbsc-multiply", async ({ command, ack, respond }) => {
  await ack();

  const args = command.text.split(" ");

  const a = Number(args[0]);
  const b = Number(args[1]);

  if (isNaN(a) || isNaN(b)) {
    return respond("❌ Invalid numbers.");
  }

  await respond(`Result: ${a * b}`);
});



app.command("/hbsc-divide", async ({ command, ack, respond }) => {
  await ack();

  const args = command.text.split(" ");

  const a = Number(args[0]);
  const b = Number(args[1]);

  if (isNaN(a) || isNaN(b)) {
    return respond("❌ Invalid numbers.");
  }

  if (b === 0) {
    return respond("❌ Cannot divide by zero.");
  }

  await respond(`Result: ${a / b}`);
});

app.command("/hbsc-coinflip", async ({ ack, respond }) => {
  await ack();

  const result =
    Math.random() < 0.5 ? "🪙 Heads" : "🪙 Tails";

  await respond(result);
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

app.command("/hbsc-funfact", async ({ ack, respond }) => {
  await ack();
  console.log('Fetching A funcFact')
  try {
    const response = await axios.get("https://uselessfacts.jsph.pl/api/v2/facts/random");
    console.log(response.data);
    await respond(response.data.text)
  } catch (err) {
    await respond("Failed to fetch a Fun Fact (Partner Server Issue).");
    console.log("Something went wrong", err)
  }
})

app.command("/hbsc-weather", async ({ ack, respond, command }) => {
  try {
    await ack();
    const city_name = command.text.trim();
    if (!city_name) {
      return await respond(
        "❌ Please provide a city name.\nExample: /hbsc-weather Mumbai"
      );
    }
    console.log(city_name);
    const get_city_data = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${city_name}&count=1`);
    console.log(get_city_data);

    if (!get_city_data.data.results) {
      return respond(
        `❌ Could not find "${city_name}". Please check the spelling and try again.`
      );
    }
    //use for debugging
    const latitude = get_city_data.data.results[0].latitude;
    const longitude = get_city_data.data.results[0].longitude;
    const get_weather = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,apparent_temperature,is_day&timezone=auto`
    );

    //use for debugging
    //console.log(get_wather_.data)

    const weather = get_weather.data.current;

    const temp = weather.temperature_2m;
    const feels_like = weather.apparent_temperature;
    const humidity = weather.relative_humidity_2m;
    const wind = weather.wind_speed_10m;
    const is_day = weather.is_day;
    let advice = "";

    if (temp > 40) {
      advice = "🔥 Stay hydrated and avoid direct sunlight.";
    } else if (temp > 30) {
      advice = "🥤 A warm day outside.";
    } else if (temp > 20) {
      advice = "😎 Pleasant weather.";
    } else {
      advice = "🧥 You may want a jacket.";
    }

    //use for debugging
    // console.log(temp)
    await respond(
      `🌤 Weather Report

📍 Location: ${city_name}

🌡 Temperature: ${temp}°C
🥵 Feels Like: ${feels_like}°C
💧 Humidity: ${humidity}%
💨 Wind Speed: ${wind} km/h

${is_day ? "☀️ Daytime" : "🌙 Nighttime"}

Advice:- ${advice}

Powered by Open-Meteo
Made by Rivaan Maurya (StarDance HackClub)
`
    );

  } catch (err) {
    await respond("⚠️ Failed to fetch Weather (Partner (Open-Metro) Server Issue , Try again Later).")
    console.log(err)
  }
})

app.command("/hbsc-meme", async ({ ack, respond }) => {
  await ack();

  try {
    await respond("Generating meme...");
    const response = await axios.get("https://meme-api.com/gimme");

    const data = response.data;

    const image_url =
      data.preview?.[data.preview.length - 1] || data.url;

    await respond(`Title ${data.title}`)
    await respond({
      blocks: [
        {
          type: "image",
          image_url,
          alt_text: "meme"
        }
      ]
    });
  } catch (err) {
    console.error(err);
    await respond("❌ Failed to fetch meme.");
  }
});

app.command("/hbsc-gemini", async ({ command, ack, respond, client }) => {
  await ack();
  console.log("Generating response from Gemini...");
  try {
    const question = command.text.trim();
    if (!question) {
      return respond(`I Think You Just Call Me! Without Any Question :) 😭`);
    }
    await respond("thinking....");

    await respond("Generating answer, please wait...");

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: question,
    });

    console.log(response);

    await respond(response.text);
  } catch (err) {
    await respond("AI Model is overloaded. Try again later.");
  }
});


(async () => {
  await app.start();
  console.log("bot is running!");
})();
