const axios = require('axios');
const Enmap = require('enmap');
const RoleManager = require('../Manager/RolesManager');

class Guild{
    constructor(options){

        this.max_video_channel_users = options.max_video_channel_users;
        this.unavailable = options.unavailable;
        this.explicit_content_filter = options.explicit_content_filter;
        
        this.verification_level = options.verification_level;
        this.vanity_url_code = options.vanity_url_code;
        this.region = options.region;
        this.premium_tier = options.premium_tier;
        this.features = options.features;
        this.guild_hashes = options.guild_hashes;
        this.banner = options.banner;
        this.system_channel_id = options.system_channel_id;
        this.emojis = options.emojis;
        this.afk_channel_id = options.afk_channel_id;
        this.public_updates_channel_id = options.public_updates_channel_id;
        this.application_id = options.application_id;
        this.members = options.members;
        this.premium_subscription_count = options.premium_subscription_count;
        this.name = options.name;
        this.voice_states = options.voice_states;
        this.system_channel_flags = options.system_channel_flags;
        
        this.mfa_level = options.mfa_level;
        this.large = options.large;
        this.rules_channel_id = options.rules_channel_id;
        this.afk_timeout = options.afk_timeout;
        this.splash = options.splash;
        this.discover_splash = options.discover_splash;
        this.default_message_notifications = options.default_message_notifications;
        this.owner_id = options.owner_id;
        this.preferred_locale = options.preferred_locale;
        this.joined_at = options.joined_at;
        this.presences = options.presences;
        this.member_count = options.member_count;
        this.icon = options.icon;
        this.description = options.description;
        this.id = options.id;
        this.client = options.client;


        this.rolesManagerOptions = {
            guildid: options.id,
            client: options.client
        }
        this.roles = new RoleManager(this.rolesManagerOptions);
    }


    async createRole(){
        
    }
}

module.exports = Guild;