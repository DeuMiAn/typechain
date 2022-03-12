import * as CryptoJS from "crypto-js";

class Block {

  static calculateBlockHash = (
    index: number,
    previousHash: string,
    timestamp: number,
    data: string
  ): string =>
    CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

  static validateStructure = (ablock: Block): boolean =>
    typeof ablock.index === "number" &&
    typeof ablock.hash === "string" &&
    typeof ablock.previousHash === "string" &&
    typeof ablock.timestamp === "number" &&
    typeof ablock.data === "string";

    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;

  constructor(
    index: number,
    hash: string,
    previousHash: string,
    data: string,
    timestamp: number
  ) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.data = data;
    this.timestamp = timestamp;
  }
}

const genesisBlock: Block = new Block(0, "2020202020", "", "hello", 123456);

let bloackchain: Block[] = [genesisBlock];

const getBloackchain = (): Block[] => bloackchain;

const getLatestBlock = (): Block => bloackchain[bloackchain.length - 1];

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string): Block => {
  const previousBlock: Block = getLatestBlock();
  const newIndex: number = previousBlock.index + 1;
  const newTimestamp: number = getNewTimeStamp();
  const newHash: string = Block.calculateBlockHash(
    newIndex,
    previousBlock.hash,
    newTimestamp,
    data
  );
  const newBlock: Block = new Block(
    newIndex,
    newHash,
    previousBlock.hash,
    data,
    newTimestamp
  );
  addBlock(newBlock);
  return newBlock;
};

const getHashforBlock=(aBlock:Block):string=>Block.calculateBlockHash(aBlock.index,aBlock.previousHash,aBlock.timestamp,aBlock.data)

const isBLockValid=( candidateBlock:Block, previousBLock:Block):boolean=>{
    if(!Block.validateStructure(candidateBlock)){
        return  false;
    }else if(previousBLock.index+1!==candidateBlock.index){
        return false;
    }else if(previousBLock.hash !== candidateBlock.previousHash){
        return  false;
    }else if(getHashforBlock(candidateBlock) !== candidateBlock.hash){
        return false;
    }else{
        return true
    }
}

const addBlock =(candidateBlock:Block):void=>{
    if(isBLockValid(candidateBlock,getLatestBlock())){
        bloackchain.push(candidateBlock);
    }
}
createNewBlock("second Block")
createNewBlock("3 Block")
createNewBlock("4 Block")

console.log(bloackchain)

export {};
