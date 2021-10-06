const WebSocket = require('ws');
const axios = require('axios');
const Enmap = require('enmap');

const EventEmit = require('events');

const Guild = require('../types/Guild');
const Message = require('../types/Message');
const ClientUser = require('../types/ClientUser');
const TextChannel = require('../types/TextChannel');
const Role = require('../types/Role');
const Activity = require('../types/Activity');
const RolesManager = require('../Manager/RolesManager');

class BaseClient{
    constructor(options){
        this.debug = options.debug || false;

        this.events = new EventEmit.EventEmitter();
        this.hb = 0;
        this.token;
        this.user;

        this.disabledEvents = options.disabledEvents || [];

        
        const ClientUser = require('../types/ClientUser');

        this.guilds = new Enmap();
        this.channels = new Enmap();
        

        this.authOP = {
            "op":2,
                "d":
                    {"token":"",
                     "properties":
                                {"os":process.platform,"browser":"dcord","device":""}}};

        this.enpoint = 'wss://gateway.discord.gg/?v=6&encoding=json';
        this.isReady = false;
    }


    async registerEvents(){
        this.ws = new WebSocket(this.enpoint);

        this.ws.on('open', async() => {
            await this.callAuth(this.ws)
        })

        this.ws.on('message', async(data) => {
            data = JSON.parse(data);
            if(data.d) data.d.client = this;
            if(this.disabledEvents.includes(data.t)) return;
            switch (data.t) {
                case 'READY':
                    await this.createUserClient()
                    this.events.emit('ready');
                    this.isReady = true;
                    break;
                case 'CHANNEL_CREATE':

                    break;
                case 'ROLE_CREATE':
                    data.d.client = this;
                    const role = new Role(data.d);
                    this.guilds.get(data.d.guildID).roles.set(data.d.id, role)
                    this.events.emit('roleCreate', (role));
                    break;
                case 'GUILD_CREATE':
                    data.d.client = this;
                    if(!this.isReady) return;
                    let guild = new Guild(data.d);
                    this.guilds.set(guild.id, guild);
                    this.events.emit('guildJoin', (guild));
                    break;
                case 'MESSAGE_CREATE':
                    let message = new Message(data.d);
                    this.events.emit('message', (message));
                    break;
                
                default:
                    if(!this.isReady){
                        if(!data.d.heartbeat_interval) return;
                        this.hb = data.d.heartbeat_interval;

                        await this.startHeartBeat(this.hb);
                        return;
                    }
                    console.warn(`UNKNOWN EVENT ${data.t}`);
                    break;
            }
            
            if(this.debug) console.log(data);
        })
    }

    async startHeartBeat(interval){
        setInterval(async() => {
            this.sendJson({
                op: 1,
                d: null
            })
        }, interval)
    }

    async createUserClient(){
        const data = await axios('https://discordapp.com/api/v6/users/@me', {
            method: 'GET', 
            headers: {
                'Authorization': this.token
            }
        }).then(x => x.data);

        this.user = new ClientUser(data);
    }

    async sendJson(data){
        await this.ws.send(JSON.stringify(data));
    }

    async callAuth(socket){
        socket.send(JSON.stringify(this.authOP))
    }

    async start(){
        await this.registerEvents()
    }

    async loadChannels(guildid) {
        const data = await axios(`https://discord.com/api/v6/guilds/${guildid}/channels`, {
            method: 'GET',
            headers: {
                'Authorization': this.token
            }
        }).then(x => x.data);

        return data;
    }

    async loadRoles(guildid) {
        const data = await axios(`https://discord.com/api/v6/guilds/${guildid}/roles`, {
            method: 'GET',
            headers: {
                'Authorization': this.token
            }
        }).then(x => x.data);

        return data;
    }

    async loadGuilds() {
        const data = await axios('https://discord.com/api/v6/users/@me/guilds', {
            method: 'GET',
            headers: {
                'Authorization': this.token
            }
        }).then(x => x.data);
        data.client = this;

        for(let i = 0; i < data.length; i++) {
            data[i].client = this;
            let guild = new Guild(data[i]);

            let channels = await this.loadChannels(guild.id);
            channels.forEach(c => {
                if(c.type !== 0) return console.log(`UNKNWON CHANNEL TYPE ${c.type}`);
                c.client = this;
                c.guildID = guild.id;
                c.guild = guild;

                const channel = new TextChannel(c);
                this.channels.set(channel.id, channel);
                channels
            });

          
            

            this.guilds.set(guild.id, guild)
        }
    }

    async login(token, bot = true) {
        
        this.token = `${bot ? 'Bot ' : ''}${token}`;
        this.authOP.d.token = `${bot ? 'Bot ' : ''}${token}`
        await this.loadGuilds()
    }

    async run(token, bot = true) {
        await this.login(token, bot);
        await this.registerEvents();

    }


  
}

module.exports = BaseClient