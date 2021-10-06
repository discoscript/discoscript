const User = require('./User');

const Guild = require('./Guild');

class Member extends User {
    constructor(options){
        super(options)
        this.roles = options.roles;
        this.mute = options.mute;
        this.joined_at = options.joined_at;
        this.hoisted_role = options.hoisted_role;
        this.deaf = options.deaf;
        this.guildID = options.guildID;
        this.guild = this.client.guilds.get(this.guildID);
    }


    async removeRole(role){
        this.client.removeRole()
    }
}

module.exports = Member;