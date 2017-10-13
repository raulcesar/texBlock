const Block = require('./Block');
const moment = require('moment');



const invalidTestFunctions = [
    (previousBlock, currentBlock) => {
        return !(currentBlock.hash === currentBlock.calculateHash() &&
            previousBlock.hash === previousBlock.calculateHash());
    },

    (previousBlock, currentBlock) => {
        return currentBlock.previoushash !== previousBlock.hash;
    },
];

module.exports = class BlockChain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock () {
        const ts = moment('09/10/2017', 'DD/MM/YYYY').format('x');
        const genesisBlock = new Block(ts, 'Genesis');
        genesisBlock.index = 0;
        return genesisBlock;
    }

    getLatestBlock () {
        return this.chain[this.chain.length - 1];
    }

    addBlock (block) {
        const lastBlock = this.getLatestBlock();

        //So as not to mutate recieved block
        const newBlock = new Block(JSON.parse(JSON.stringify(block)));

        newBlock.previoushash = lastBlock.hash;
        newBlock.index = lastBlock.index + 1;
        newBlock.updateHash();
        this.chain.push(newBlock);
        return newBlock;
    }


    isChainValid () {
        let valid = true;

        for (let i = 1; i < this.chain.length; i++) {
            const previousBlock = this.chain[i - 1];
            const currentBlock = this.chain[i];
            for (let func of invalidTestFunctions) {
                if (func(previousBlock, currentBlock)) {
                    return false;
                }
            }
        }
        return true;
    }
};

