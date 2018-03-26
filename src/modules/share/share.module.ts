import { Module } from '@nestjs/common';
import {RedisProvider} from "../../providers/redis.provider";

@Module({
    imports: [],
    components: [
        RedisProvider
    ],
    exports:[RedisProvider]
})
export class ShareModule {}