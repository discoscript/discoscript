const discr = require('../lib');

const bot = new discr.Client({
    debug: false,
    disabledEvents: ['PRESENCE_UPDATE'],
    prefix: '!',
})

bot.on('ready', async () => {
    console.log('Bot ready!');
})

bot.run('MTdqrd0vGDV1dcF0QPjom6OB.NQxUhj.I4JjFHIympR3mVF3UiUbbD5VVbi'); // INVALID TOKEN