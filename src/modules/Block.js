const crypto = require('crypto');
const secret = 'abcdefg';

module.exports = class Block {
    constructor(timestampOrObject, data) {
        let timestamp = timestampOrObject;
        if (timestampOrObject && timestampOrObject.hash) {
            data = timestampOrObject.data;
            timestamp = timestampOrObject.timestamp;
        }

        this.index = 0;
        this.timestamp = timestamp;
        this.data = data;
        this.previoushash = '';
        this.hash = '';
        this.updateHash();
    }

    calculateHash () {
        const str4Hash = this.index + this.timestamp + JSON.stringify(this.data) + this.previoushash;

        const hash = crypto.createHmac('sha256', secret)
            .update(str4Hash)
            .digest('hex');
        return hash;
    }

    updateHash() {
        this.hash = this.calculateHash();
    }

    echo (msg) {
        console.log(`msg: ${msg}`);
    }
};

