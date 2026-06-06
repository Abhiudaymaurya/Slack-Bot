# 🤖 SlackyBOT

SlackyBOT is a feature-rich Slack bot built with **Node.js**, **Slack Bolt**, and **Google Gemini AI**. It combines productivity tools, AI-powered assistance, weather information, calculators, and fun commands into a single Slack experience.

Built as part of the **StarDance Hack Club** challenge.

---

## ✨ Features

### 🤖 AI Assistant

- Ask questions directly from Slack using Google Gemini AI.
- Get instant AI-generated responses without leaving your workspace.

### 🌤 Weather Reports

- Search weather information for any city.
- Includes:
  - Temperature
  - Feels-like temperature
  - Humidity
  - Wind speed
  - Day/Night status
  - Weather advice

### 🧮 Calculator Utilities

- Addition
- Subtraction
- Multiplication
- Division

### 🎭 Fun Commands

- Random jokes
- Random fun facts
- Random memes
- Coin flips

### ⚡ Utility Commands

- Help command
- Ping/latency checker

---

## 📸 Preview

### Gemini AI

![Gemini Demo](images/gemini-demo.png)

### Weather Command

![Weather Demo](images/weather-demo.png)

### Meme Command

![Meme Demo](images/meme-demo.png)

---

## 📋 Available Commands

| Command                   | Description                    |
| ------------------------- | ------------------------------ |
| `/hbsc-help`              | Display all available commands |
| `/hbsc-ping`              | Check bot latency              |
| `/hbsc-sum <a> <b>`       | Add two numbers                |
| `/hbsc-minus <a> <b>`     | Subtract two numbers           |
| `/hbsc-multiply <a> <b>`  | Multiply two numbers           |
| `/hbsc-divide <a> <b>`    | Divide two numbers             |
| `/hbsc-joke`              | Get a random joke              |
| `/hbsc-funfact`           | Get a random fun fact          |
| `/hbsc-meme`              | Generate a random meme         |
| `/hbsc-coinflip`          | Flip a coin                    |
| `/hbsc-weather <city>`    | Get weather information        |
| `/hbsc-gemini <question>` | Ask Gemini AI                  |

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/Abhiudaymaurya/Slack-Bot.git
cd Slack-Bot
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file:

```env
SLACK_BOT_TOKEN=your_bot_token
SLACK_APP_TOKEN=your_app_token
GEMINI_API_TOKEN=your_gemini_api_token
```

### 4. Start the bot

```bash
npm start
```

---

## 🛠 Built With

- Node.js
- Slack Bolt
- Google Gemini AI
- Axios
- Open-Meteo API
- Meme API
- Official Joke API

---

## 🎯 Project Goals

This project was created to learn:

- Slack Bot Development
- API Integration
- AI Integration
- Error Handling
- Async JavaScript
- Real-world Backend Development

---

## 🙏 Credits

- Google Gemini Documentation
- Slack Bolt Documentation
- Open-Meteo API
- Meme API
- Official Joke API
- StarDance Hack Club

---

## 🚀 Future Plans

- Nest Deployment (24/7 Hosting)
- Better Slack UI Blocks
- AI Image Features
- User Preferences
- More Utility Commands

---

## Made by Rivaan Maurya (Abhiuday Maurya)

## 📄 License

This project is licensed under the MIT License.
