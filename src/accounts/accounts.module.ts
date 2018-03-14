import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { Account } from '../entity/account.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Account])],
    components: [AccountsService],
    controllers: [AccountsController],
})
export class AccountsModule {}