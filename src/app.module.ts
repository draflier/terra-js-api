import { Module } from '@nestjs/common';
import { TerraModule } from './terra/terra.module';
import { EvmModule } from './evm/evm.module';
import { ConfigModule } from '@nestjs/config';
//import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [TerraModule, EvmModule, ConfigModule.forRoot()],
})
export class AppModule {}
