const Channel = require('./Channel');
const Message = require('./Message');

const axios =  require('axios').default;


class TextChannel extends Channel{
    constructor(options){
        super(options)
    }


    async send(content, options = { tts: false }) {
        const data = {
            nonce: 0,
            tts: options.tts ? options.tts : false
        };

        if(typeof content === 'string') data.content = content;
        if(typeof content === 'object') data.embed = content;

        let d = await this.client.sendMessage(this.id, data.content, options, data.embed);

        return d;
        
        
   
    }
}

module.exports = TextChannel;