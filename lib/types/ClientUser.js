const axios = require('axios');
const User = require('./User');

class ClientUser extends User{
    constructor(options){
        super(options)
        this.bot = options.bot;
        this.email = options.email;
        this.verified = options.verified;
        this.locale = options.locale;
        this.mfa_enabled = options.mfa_enabled;
        this.flags = options.flags;
        this.public_flags = options.public_flags;
    }
}

module.exports = ClientUser;