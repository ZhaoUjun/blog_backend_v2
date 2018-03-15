import { Module } from '@nestjs/common';
import { RedisService } from './redis.service'
import { CommonService } from './common.service'

@Module({
    imports: [],
    components: [RedisService,CommonService],
    exports:[RedisService,CommonService]
})
export class CommonModule {}