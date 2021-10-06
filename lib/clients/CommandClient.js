const Client = require('./Client');

const Enmap = require('enmap');

const fs = require('fs');

class CommandClient extends Client{
    constructor(options){
        super(options);
        this.prefix = options.prefix || '!';
        this.commands = new Enmap();
        this.commandDir = options.commandDir;

        this.loadCommandsFromDirectory();


        this.on('message', async (message) => {
            if(!message.content.startsWith(this.prefix)) return;
            if(message.author.bot) return;
            if(!message.member) return;

            let cmdname = message.content.split(' ')[0].replace(this.prefix, '');

            let args = message.content.split(' ').slice(1)

            await this.execute(cmdname, message, args)
        })
    }

    loadCommand(command){

        this.commands.set(command.name, command)
    }

    async execute(commandName, message, args){
        try{
        this.emit('commandInvoke', (commandName, message, args))
        let command = this.commands.get(commandName);

        if(!command) throw new CommandInvokeError(`Command ${commandName} not found...`);

        await command.execute(message, args).catch(e => this.emit('commandInvokeError', message, args, e));
        }catch(e){

                this.emit('commandInvokeError', message, args, e)
        }
        
    }


    loadCommandsFromDirectory(directory = this.commandDir){
        let a = fs.readdirSync(directory);
        a.forEach(cmd => {
            let command = require(`${directory}/${cmd}`);
            this.loadCommand(new command())
        })
    }


    
}


class CommandInvokeError extends Error{};

module.exports = CommandClient;