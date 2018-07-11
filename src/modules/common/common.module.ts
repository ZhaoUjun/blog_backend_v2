import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { ShareModule } from '../share/share.module';
@Module({
	imports: [ShareModule],
	providers: [CommonService],
	exports: [CommonService],
})
export class CommonModule {}
