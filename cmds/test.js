const Command = require('../../lib/src/types/Command')
const EmbedBuilder = require('../../lib/src/types/EmbedBuilder')

class TestCommand extends Command {
    constructor(){
        super({
            name: 'auff',
            description: 'aufff',
            category: 'aufff'
        })
    }
    async execute(message, args){
        message.channel.send('Hello World!');
    }
}

module.exports = TestCommand;