

const Enmap = require('enmap');



class Manager{
    constructor(options){
        this.cache = new Enmap();
    }
}


module.exports = Manager;