# 🤖 SlackyBOT

SlackyBOT is a simple yet powerful Slack bot built with Node.js and Slack Bolt. It provides useful utility commands, fun interactions, and AI-powered responses directly inside Slack.

## ✨ Features

* 🏓 **Ping Command** — Check bot latency and responsiveness.
* 😂 **Random Jokes** — Fetch a random joke from an external API.
* ➕ **Calculator Commands** — Perform simple calculations like addition.
* 🤖 **Gemini AI Integration** — Ask questions and receive AI-generated responses directly in Slack.
* 📚 **Help Command** — View all available commands in one place.


## 📸 Preview

Add screenshots or GIFs of your bot here.


## 📋 Available Commands

| Command                   | Description                      |
| ------------------------- | -------------------------------- |
| `/hbsc-help`              | Display all available commands   |
| `/hbsc-ping`              | Check bot latency                |
| `/hbsc-joke`              | Get a random joke                |
| `/hbsc-sum <a> <b>`       | Calculate the sum of two numbers |
| `/hbsc-gemini <question>` | Ask Gemini AI a question         |

## 🚀 Installation

### 1. Clone the repository

```bash
git https://github.com/Abhiudaymaurya/Slack-Bot.git
cd Slack-Bot
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
SLACK_BOT_TOKEN=your_bot_token
SLACK_APP_TOKEN=your_app_token
GEMINI_API_KEY=your_gemini_api_key
```

### 4. Start the bot

```bash
npm start
```

## 🛠 Built With

* Node.js
* Slack Bolt
* Google Gemini AI
* Axios

## Credits

* Gemini Documentation — [Google Docs](https://ai.google.dev/gemini-api/docs)
* Slack Documentation — [Slack Docs](https://slack.dev/)
* StarDance HackClub — [StarDance](https://stardance.hackclub.com)

## 🎯 Future Plans

* More utility commands
* Better AI interactions
* Weather and GitHub integrations
* Improved message formatting
* 24/7 deployment using Nest

## 📄 License

This project is licensed under the MIT License.
