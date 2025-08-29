![Static Badge](https://img.shields.io/badge/bot_status-online-green)

# MindSync (Discord Bot)
Task-management Discord bot with AI-assistance and real-time updating.

![demo](https://github.com/user-attachments/assets/9a86b1ef-e2d2-46c2-974e-134888ffef3e)

## Adding to Server
To use the bot directly, you can invite it to your server by clicking on the link provided under the 'About' section top-right.

## Local Setup (For Development)

If you want to run the bot locally, follow the steps (tested with Node.js v20.18.2):

1. Clone the repository to your local machine.
```bash
git clone https://github.com/mohammadalshikh/mindsync
```

2. Install the dependencies.
```bash
npm i --force
```

3. Create a `.env` file in the root directory and populate it with your Bot Token and OpenAI key.
```env
DISCORD_TOKEN=replace_with_your_token
OPENAI_KEY=replace_with_your_key
```

4. Start the bot.
```bash
npm run start
```

5. Invite the bot:

	- Navigate to the Discord Developer Portal and create a new application.

	- Go to the 'Bot' tab and click on 'Reset Token'. Make sure to copy the token, as you'll need it for running the bot locally.

	- Under the 'OAuth2' tab, select the 'bot' scope and the permissions your bot requires.

	- Use the generated OAuth2 URL to invite the bot to your server.
