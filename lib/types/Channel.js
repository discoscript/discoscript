const Guild = require('./Guild');

class Channel {
    constructor(options){
        this.client = options.client
        this.type = options.type || 0;
        this.position = options.position;
        this.topic = options.topic;
        this.parent_id = options.parent_id;
        this.nsfw = options.nsfw;
        this.guildID = options.guildID;
        this.guild = this.client.guilds.get(this.guildID);
        this.id = options.id;
    }
}

module.exports = Channel;