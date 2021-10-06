const Manager = require('./BaseManager');
const axios = require('axios').default;
const ApiRequest = require('../types/ApiRequest');
const Role = require('../types/Role');

class RoleManager extends Manager{
    constructor(options){
        super({
            type: 'RoleManager'
        })

        this.guildID = options.guildid;
        this.client = options.client;
        this.loadCache()
    }

    

    async loadCache(){
        console.log(this.guildID)
        let guild = await this.client.fetchGuild(this.guildID);
        this.guild = guild;
        
        let roles = await this.fetchRoles();
        

        
        roles.forEach(r => {
            this.cache.set(r.id, r);
        });

    }


    async fetchRoles(){
        return ApiRequest({url: `/guilds/${this.guild.id}/roles`, method: 'GET'}, this.client.token);
    }

    /**
     * 
     * @param {*} options Role options
     */

    async createRole(options){
        let d = await ApiRequest({
            url: `/guilds/${this.guild.id}/roles`,
            method: 'POST',
            body: {
                options
            },
            token: this.client.token
        })
        d.client = this.client;
        return new Role(d)
    }


    /**
     * 
     * @description Get role from cache
     * 
     * @param {String} id ID of role
     * 
     * @returns {Role} Role from cache
     * 
     * 
     */
    get(id){

        return this.cache.get(id)
        
    }





}

module.exports = RoleManager;