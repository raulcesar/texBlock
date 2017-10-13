const Block = require('./modules/Block');
const BlockChain = require('./modules/BlockChain');
const moment = require('moment');

const texChain = new BlockChain();
const b = new Block(moment().format('x'), {recipient: 'publicKeyOfRec', amount: 10});
const bIncluded = texChain.addBlock(b);
console.log(`testBeforeDirectManip: ${texChain.isChainValid()}`);

// texChain.chain.push(bIncluded);
// console.log(`testAfterPushing block directly.: ${texChain.isChainValid()}`);

bIncluded.index = 2;
console.log(`testAfterDirectManip: ${texChain.isChainValid()}`);



console.log(`b: ${JSON.stringify(b)}\nbIncluded: ${JSON.stringify(bIncluded)}`);