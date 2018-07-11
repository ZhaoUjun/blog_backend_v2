import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Account } from '../../entity/account.entity';
import { ShareModule } from '../share/share.module';
@Module({
	imports: [TypeOrmModule.forFeature([Account]), ShareModule],
	providers: [AdminService],
	controllers: [AdminController],
})
export class AdminModule {}
