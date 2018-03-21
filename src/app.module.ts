import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { SessionMiddleware } from './middlewares/session.middleware'
import { LoggerMiddleware } from './middlewares/logger.middleware'
import { ArticleModule } from './article/article.module';
import { AdminModule } from './admin/admin.module'
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller'
import { CommonModule } from './common/common.module'
import { ShareModule } from './share/share.module'
// import { RedisProvider } from './providers/redis.provider'



@Module({
    imports: [
        TypeOrmModule.forRoot(),
        ArticleModule,
        AdminModule,
        CommonModule,
        ShareModule
    ],
    // components:[
    //     RedisProvider
    // ],
    controllers:[AppController]
})
export class ApplicationModule implements NestModule {
    configure(consumer: MiddlewaresConsumer): void {
        consumer.apply([LoggerMiddleware,SessionMiddleware]).forRoutes(
            { path: '/', method: RequestMethod.ALL },
        );
    }
}