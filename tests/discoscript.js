const { token } = require('./config/config')
const disco = require('../main');

const bot = new disco.CommandClient({
    debug: false,
    prefix: '!',
    commandDir: 'cmds'
})

bot.on('ready', async () => {
    console.log(`[READY] ${bot.user.username} ready!`);
});

bot.on('message', async (message) => {
    console.log(message);
});

bot.run(token);