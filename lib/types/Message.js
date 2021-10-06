
const User = require('./User');
const Member = require('./Member');

class Message {
    constructor(options){
        this.client = options.client;
        this.type = options.type;
        this.timestamp = options.timestamp;
        this.pinned = options.pinned;
        this.nonce = options.nonce;
        this.mentions = options.mentions;
        this.mention_roles = options.mention_roles;
        this.mention_everyone = options.mention_everyone;
        this.id = options.id;
        this.flags = options.flags;
        this.embeds = options.embeds;
        this.edited_when = options.edited_timestamp;
        this.content = options.content;
        this.text = options.content;
        this.channel_id = options.channel_id;   
        this.channel = this.client.channels.get(this.channel_id);
        
        
        

        options.author.client = this.client;
        this.author = new User(options.author)
        
        this.fetchAuthor(options.author.id)
        this.memberOptions = options.author;
        if(options.member){
            this.guildID = this.guildID;
            
            this.memberOptions.roles = options.member.roles;
            this.memberOptions.mute = options.member.mute;
            this.memberOptions.joined_at = options.member.joined_at;
            this.memberOptions.hoisted_role = options.member.hoisted_role;
            this.memberOptions.deaf = options.member.deaf;
            this.memberOptions.client = this.client;
            this.member = new Member(this.memberOptions);
            
        }


        
        this.attachments = options.attachments;
        this.guild_id = options.guild_id;
        this.guild = this.client.guilds.get(this.guild_id);
    }

    async fetchAuthor(id){
            let r = await this.client.fetchUser(id);
            
            this.author = r;
    }

    async reply(content, options = { tts: false }) {
        return await this.channel.send(`${this.author.mention} ${content}`);
    }


    static createMessage(data){
        return new this(data)
    }
}

module.exports = Message;