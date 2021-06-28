
const SHA256 = require("crypto-js/sha256");
class block {
    constructor(index, data, timestamp, previousHash ='') {
        this.index = index;
        this.data= data;
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.hash= this.blockHashing();
    }
    blockHashing(){
        return SHA256(this.index + JSON.stringify(this.data)+ this.timestamp+ this.previousHash).toString();
    }

}
class Blockchain{
    //Create Genesis block
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }
    createGenesisBlock() {
        return new block(0, "GenesisBlock", "28/06/2021", "0");
    }
    //Add blocks into chain
    getLastBlock(){
        return this.chain[this.chain.length - 1];
    }
    addBlock(newBlock){
        newBlock.previousHash= this.getLastBlock().hash;
        newBlock.hash = newBlock.blockHashing();
        this.chain.push(newBlock);
    }
    //Validate Chain
    isChainValid(){
        for(let i=1; i<this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock =this.chain[i-1];
            if( currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
            if( currentBlock.hash !== currentBlock.blockHashing()){
                return false;
            }
        }
        return true;
    }
}
const NewCoin = new Blockchain();
NewCoin.addBlock(new block(1, "Data","28/07/2021"));
NewCoin.addBlock(new block(2, "Dulieu", "28/07/2021"));
console.log(NewCoin.chain);
