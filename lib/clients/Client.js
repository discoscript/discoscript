const BaseClient = require('./BaseClient');

const axios = require('axios');

const User = require('../types/User');
const Guild = require('../types/Guild');
const TextChannel = require('../types/TextChannel');
const Message = require('../types/Message');
const Role = require('../types/Role');

const ApiRequest = require('../types/ApiRequest')

class Client extends BaseClient{
    constructor(options){
        super(options)

        
    }

    on(...args){
        this.events.on(...args)
    }

    emit(...args){
        this.events.emit(...args)
    }

    async fetchUser(userid) {
        const data = await axios(`https://discordapp.com/api/v9/users/${userid}`, {
            method: 'GET', 
            headers: {
                'Authorization': this.token
            }
        }).then(x => x.data);
        
        return new User(data);
    }

    async fetchGuild(guildid) {
        const data = await axios(`https://discordapp.com/api/v9/guilds/${guildid}`, {
            method: 'GET', 
            headers: {
                'Authorization': this.token
            }
        }).then(x => x.data).catch(e => console.log('[ERROR] ' + e));
        
        return new Guild(data);
    }

    async fetchChannel(channelID) {
        const data = await axios(`https://discordapp.com/api/v9/channels/${channelID}`, {
            method: 'GET',
            headers: {
                'Authorization': this.token
            }
        }).then(x => x.data);

        data.client = this;
        return new TextChannel(data);
    }

    async sendMessage(chid, content, options = {tts: false}, embed = {}){

        let d = await axios(`https://discordapp.com/api/v9/channels/${chid}/messages`, {
            method: 'POST',

            headers: {
                'Authorization': this.token
            }, 

            data: {
                content: content,
                embed: embed,
                nonce: 0,
                tts: options.tts
            }
            
        }).then(x => x.data);
        d.client = this;

        return new Message(d)
    }

    async apiRequest(options){
        return await ApiRequest({url: options.url, method: options.method}, this.token);
    }

 

    async removeMemberRole(guildid, member, role){
        let d = await axios(`https://discord.com/api/v9/guilds/${guildid}/members/${member.id}/roles/${role.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': this.token
            },
        }).then(x => x.data);
        d.client = this;

        
    }
}

module.exports = Client;