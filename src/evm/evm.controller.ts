import { Body, Controller, Get, Param, Post,Query,Req } from '@nestjs/common';

import {EvmService} from './evm.service';
import {ethers} from 'ethers';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiPayloadTooLargeResponse,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiQuery
} from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import {SimpleResp} from '../entities/simp_resp.entity'


@ApiBearerAuth()
@ApiTags('EVM')
@Controller('EVM')
export class EvmController {
    private readonly logger = new Logger(EvmController.name);


    constructor(private readonly evmService: EvmService) {
      
    }



    @Get('/get-address')
    @ApiOperation({ summary: 'Get Address', description: 'Get Address' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    //@ApiQuery({name: 'br_num'})    
    async getAddr( ) : Promise<string>{
      try{        
        Logger.debug("Inside getAddress Controller");
        return this.evmService.getWalletAddress();
      }
      catch (err)
      {
        Logger.debug(err);
      }
    }

    @Get('/mint-erc20')
    @ApiOperation({ summary: 'Mint specified erc20', description: 'Mint erc20 of a certain amount' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiQuery({name: 'contract_address'})     
    @ApiQuery({name: 'to_address'}) 
    @ApiQuery({name: 'amount'})   
    async minterc20(@Query('contract_address') strContractAddress : string, @Query('to_address')strToAddr : string , @Query('amount')strAmt : string ) : Promise<string>{
      try{        
        Logger.debug("Minting " + strContractAddress + " to => " + strToAddr);
        
        
        
        return this.evmService.mintErc20(strContractAddress, strAmt, strToAddr);
      }
      catch (err)
      {
        Logger.debug(err);
      }
    }


    @Get('/transfer-erc20')
    @ApiOperation({ summary: 'Transfer specified erc20', description: 'Transfer erc20 of a certain amount' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiQuery({name: 'contract_address'})     
    @ApiQuery({name: 'to_address'}) 
    @ApiQuery({name: 'amount'})   
    async transfererc20(@Query('contract_address') strContractAddress : string, @Query('to_address')strToAddr : string , @Query('amount')strAmt : string ) : Promise<string>{
      try{        
        Logger.debug("Transferring " + strContractAddress + " to => " + strToAddr);
        
        
        
        return this.evmService.transferErc20(strContractAddress, strAmt, strToAddr);
      }
      catch (err)
      {
        Logger.debug(err);
      }
    }


}
