import { Injectable} from '@nestjs/common';
import { ethers,  Wallet } from "ethers";

import { Logger } from '@nestjs/common';
import Token from '../Utils/abi/DrafMeme.json';


import { sleepMilliSec } from '../Utils/sleep-util';
import { Tx } from '@terra-money/terra.js';

//import abi from '../../../2_contracts/artifacts/DealerApplDB_metadata.json';
//import dealerApplDBABI from '../../../2_contracts/artifacts/abiDB.json';
//import '../Utils/envSetter';

@Injectable()
export class EvmService {

  private GAS_LIMIT = {gasLimit: 5000000 };
  private readonly logger = new Logger(EvmService.name);

  private objWallet : Wallet;
  private objProvider : ethers.providers.JsonRpcProvider; 
  //private strContractAddr : string = "0x159965706AD1f0d9F32ac91fE5E033041B323e6B";
  //private numGasFee : number = 0.1 * 1000000;

  constructor()
  {
    this.objProvider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545/", {name: "BSC Testnet", chainId: 97});
    
    this.objWallet = this.getWallet();  

  }
  async create(strContractAddress: string, intAmt : number, strToAddr: string) : Promise<string>
  {
    return "";
  }

  async getWalletAddress() : Promise<string>
  {
    
    return this.objWallet.getAddress();
  }


  async mintErc20(strContractAddress: string, strAmt : string, strToAddr: string) : Promise<string>
  { 
    let objContract = new ethers.Contract(strContractAddress, Token.abi,this.objWallet);
    let bignumAmt = ethers.utils.parseUnits(strAmt,18);
    let objTx = await objContract.mint(strToAddr,bignumAmt,this.GAS_LIMIT);
    let objTxnReceipt = await this.objProvider.waitForTransaction(objTx.hash);
    Logger.debug(objTxnReceipt);
    return strAmt + "of " + strContractAddress + "is minted to " + strToAddr;
  }



  async transferErc20(strContractAddress: string, strAmt : string, strToAddr: string) : Promise<string>
  {
    let objContract = new ethers.Contract(strContractAddress, Token.abi,this.objWallet);
    let bignumAmt = ethers.utils.parseUnits(strAmt,18);
    let objTx = await objContract.transfer(strToAddr,bignumAmt,this.GAS_LIMIT);
    let objTxnReceipt = await this.objProvider.waitForTransaction(objTx.hash);
    Logger.debug(objTxnReceipt);
    return strAmt + "of " + strContractAddress + "is transferred to " + strToAddr;
  }

  initWallet()
  {
    let strPassword : string = "";

    let strMnemonicPhrase : string = "travel stuff payment raccoon fiction artwork party lion aerobic heavy welcome casino";
    this.objWallet = Wallet.fromMnemonic(strMnemonicPhrase);    
    this.objWallet = this.objWallet.connect(this.objProvider);
    console.log(this.objWallet);

  }

  getWallet() : Wallet
  {
    if (this.objWallet == null)
    {
      this.initWallet();
    }
    return this.objWallet;
  }






}
