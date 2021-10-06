class Command{
    constructor(options){
        this.name = options.name;
        this.description = options.description || '';
        this.category = options.category;
    }
    async execute(message, args){
        
    }
}

module.exports = Command;