
const Guild = require('./Guild');
const axios = require('axios');

class Role {
    constructor(options = {}) {
        this.client = options.client;
        this.id = options.id || null;
        this.name = options.name || null;
        this.color = options.color || 0;
        this.hoist = options.hoist || false;
        this.position = options.position || 0;
        this.permissions = options.permissions || 0;
        this.managed = options.managed || false;
        this.mentionable = options.mentionable || false;
        
        this.guildID = options.guildID;
        this.guild = this.client.guilds.get(this.guildID);;
        this.deleted = false;
    }

    async delete(reason) {
        await axios(`https://discord.com/api/v9/guilds/${this.guild.id}/roles/${this.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': this.client.token
            },
            data: {
                'reason': reason
            }
        });

        this.deleted = true;
        return this;
    }

    async setPosition(position) {
        if(this.deleted) return;
        
        this.position = position;

        await axios(`https://discord.com/api/v9/guilds/${this.guild.id}/roles`, {
            method: 'PATCH',
            headers: {
                'Authorization': this.client.token
            },
            data: [
                {
                    'id': this.id, 
                    'position': this.position 
                }
            ]
        });

        return this;
    }

    async edit(data, reason) {
        if(this.deleted) return;

        if(data['name']) this.name = data['name'];
        if(data['mentionable']) this.mentionable = data['mentionable'];
        if(data['permissions']) this.permissions = data['permissions'];
        if(data['color']) this.color = data['color'];
        if(data['hoist']) this.hoist = data['hoist'];
        
        await axios(`https://discord.com/api/v9/guilds/${this.guild.id}/roles/${this.id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': this.client.token
            },
            data: {
                'name': this.name,
                'permissions': this.permissions,
                'color': this.color,
                'hoist': this.hoist,
                'mentionable': this.mentionable
            }
        });

        return this;
    }
}

module.exports = Role;