const User = require('./User');

class EmbedBuild {
    constructor(options = {}) {
        this.title = options.title;
        this.description = options.description;
        this.url = options.url;
        this.color = options.color;
        this.timestamp = options.timestamp && new Date(options.timestamp).getTime() || null;
        this.author = options.author && {
            name: options.author.name,
            icon_url: options.author.icon_url,
            url: options.author.url
        } || {};
        this.footer = options.footer && {
            text: options.footer.text,
            icon_url: options.footer.icon_url
        } || {};
        this.image = options.image || null;
        this.thumbnail = options.thumbnail || null;
        this.fields = options.fields || [];
    }

    setTitle(title) {
        this.title = title;
        return this;
    }

    setDescription(description) {
        this.description = description;
        return this;
    }
    
    setUrl(url) {
        this.url = url;
        return this;
    }

    setColor(color) {
        this.color = parseInt(color.replace('#', ''), 16);
        return this;
    }

    setTimestamp(timestamp = Date.now()) {
        if(timestamp instanceof Date) 
            this.timestamp = timestamp.getTime();
        else 
            this.timestamp = timestamp;
        return this;
    }

    setAuthor(name, icon_url = null, url = null) {
        this.author = { name, icon_url, url };
        return this;
    }

    setFooter(text, icon_url = null) {
        this.footer = { text, icon_url };
        return this;
    }

    setImage(url) {
        this.image = { url };
        return this;
    }

    setThumbnail(url) {
        this.thumbnail = { url };
        return this;
    }

    addField(name, value, inline = false) {
        this.fields.push({name, value, inline});
        return this;
    }

    build() {
        return {
            title: this.title,
            description: this.description,
            url: this.url,
            color: this.color,
            timestamp: this.timestamp && new Date(this.timestamp) || null,
            author: {
                name: this.author.name,
                icon_url: this.author.icon_url,
                url: this.author.url
            },
            footer: {
                text: this.footer.text,
                icon_url: this.footer.icon_url,
            },
            image: this.image,
            thumbnail: this.thumbnail,
            fields: this.fields
        };
    }
}

module.exports = EmbedBuild;