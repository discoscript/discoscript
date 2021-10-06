const { token } = require('./config/config')
const discr = require('../main');

const bot = new discr.CommandClient({
    debug: false,
    disabledEvents: ['PRESENCE_UPDATE'],
    prefix: '!',
    commandDir: 'tests/cmds'
})

bot.on('ready', async () => {
    console.log(`[READY] ${bot.user.username} ready!`);
})

bot.run(token);