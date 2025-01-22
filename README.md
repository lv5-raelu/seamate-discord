## Features

### Built-In Bot Features:

-   Basic command structure.
-   Rate limits and command cooldowns.
-   Welcome message when joining a server.
-   Shows server count in bot status.
-   Posts server count to popular bot list websites.
-   Support for multiple languages.

### Developer Friendly:

-   Written with TypeScript.
-   Uses the [discord.js](https://discord.js.org/) framework.
-   Built-in debugging setup for VSCode.
-   Written with [ESM](https://nodejs.org/api/esm.html#introduction) for future compatibility with packages.
-   Support for running with the [PM2](https://pm2.keymetrics.io/) process manger.
-   Support for running with [Docker](https://www.docker.com/).

### Scales as Your Bot Grows:

-   Supports [sharding](https://discordjs.guide/sharding/) which is required when your bot is in 2500+ servers.
-   Supports [clustering](https://github.com/KevinNovak/Discord-Bot-TypeScript-Template-Master-Api) which allows you to run your bot on multiple machines.

## Commands

This bot has a few example commands which can be modified as needed.

### Help Command

A `/help` command to get help on different areas of the bot or to contact support:

![](https://i.imgur.com/UUA4WzL.png)

![](https://i.imgur.com/YtDdmTe.png)

![](https://i.imgur.com/JXMisap.png)

### Info Command

A `/info` command to get information about the bot or links to different resources.

![](https://i.imgur.com/0kKOaWM.png)

### Test Command

A generic command, `/test`, which can be copied to create additional commands.

![](https://i.imgur.com/lqjkNKM.png)

### Dev Command

A `/dev` command which can only be run by the bot developer. Shows developer information, but can be extended to perform developer-only actions.

![](https://i.imgur.com/2o1vEno.png)

### Welcome Message

A welcome message is sent to the server and owner when the bot is added.

![](https://i.imgur.com/QBw8H8v.png)

## Start Scripts

You can run the bot in multiple modes:

1. Normal Mode
    - Type `npm start`.
    - Starts a single instance of the bot.
2. Manager Mode
    - Type `npm run start:manager`.
    - Starts a shard manager which will spawn multiple bot shards.
3. PM2 Mode
    - Type `npm run start:pm2`.
    - Similar to Manager Mode but uses [PM2](https://pm2.keymetrics.io/) to manage processes.
