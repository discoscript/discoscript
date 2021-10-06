const axios = require('axios').default;

const endpoint = 'https://discord.com/api/v9'

async function ApiRequest(options, token){
        let body = options.body;
        let method = options.method;
        console.log(`${endpoint}${options.url}`)
        return await axios(`${endpoint}${options.url}`, {
            method: method,
            data: body,
            headers: {
                'Authorization': token
            }
        }).then(x => x.data)
}


module.exports = ApiRequest;