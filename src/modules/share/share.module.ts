import { Module } from '@nestjs/common';
import {RedisProvider} from "../../providers/redis.provider";
import {JwtProvider} from "../../providers/jwt.provider";

@Module({
    imports: [],
    components: [
        RedisProvider,
        JwtProvider
    ],
    exports:[RedisProvider,JwtProvider]
})
export class ShareModule {}