const axios = require('axios');

const Dcord = require('../index');

class User{
    constructor(options) {
        this.client = options.client;
        this.username = options.username;
        this.flags = options.public_flags;
        this.id = options.id;
        this.discriminator = options.discriminator;
        this.mention = `<@${this.id}>`;
        this.tag = `${this.username}#${this.discriminator}`
        this.channelID;
        this.bot = options.bot || false;
    }

    async send(content, options){
        if(!this.channelID) await this.openDM();
        if(!options) options = {tts: false};
        let message = await this.client.sendMessage(this.channelID, content, options);
        return message
    }


    async openDM() {
        const data = await axios(`https://discord.com/api/v6/users/${this.client.user.id}/channels`, {
            method: 'POST', 

            headers: {
                'Authorization': this.client.token
            }, 

            data: {
                recipients: [this.id]
            }
        }).then(x => x.data);

        this.channelID = data.id;
    }
}


module.exports = User;