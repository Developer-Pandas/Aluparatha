const SHA256 = require('crypto-js/sha256');


class Block{
	Constucture(index,timestamp,data,previoushash =''){
		// constructure is used for allocation of memory. 
		// index is optional and it tells where the block seats on the blockchain
		//Timestamp will tell us when the block was created 
		// Data contains any type of data that you want to associate with class in case of currency how much money was transfer and who was the sender and receiver.
		//Previoushash is the string which contains the Hash of the previous bloack this is IMP and shows the integrity of block chain.
		this.index=index;
		this.timestamp=timestamp;
		this.data=data;
		this.previoushash=previoushash;
		// this is used to keep track of all these values 
		this.hash= this.calculateHash();
		// hash is the hash of the current block.
		// when we create hash it will calculate the hash with all the parameters.
	}

	calculateHash(){
		// this is a function which is specified in crypto js library 
		//
		console.log(JSON.stringify(SHA256(this.index + this.previoushash + this.timestamp + JSON.stringify(this.data)).toString(), null, 4));
		return SHA256(this.index + this.previoushash + this.timestamp + JSON.stringify(this.data)).toString();
		
		// why JSON These are universal data structures. Virtually all modern programming languages support them in one form or another.
		//	It makes sense that a data format that is interchangeable with programming languages also be based on these structures.
		// JSON.stringify() method converts a JavaScript value to a JSON string
		// we are taking whole output in string thats why we have used .toString()
	
	}

}



class Blockchain{
	constructor(){
		
		// initialing a blockchain 
		
		this.chain = [this.createGenesisBlock()];
		
		
	}
	
	createGenesisBlock(){
			return new Block(0, "01/01/2017", "Genesis block", "0");
			}

	getLatestBlock(){
			return this.chain[this.chain.length - 1];
		}

	addBlock(newBlock){
	newBlock.previousHash = this.getLatestBlock().hash;
	newBlock.hash = newBlock.calculateHash();// every time the block is created the new hash should be calculated for the same.
	this.chain.push(newBlock);
	
		}
}
	// instance of blockchain 
	let goCoin = new Blockchain();
	goCoin.addBlock(new Block(1, "11/10/2019", {amount: 4}));
	goCoin.addBlock(new Block(2, "12/10/2019", {amount: 10}));
	console.log(JSON.stringify(goCoin, null, 4 ));