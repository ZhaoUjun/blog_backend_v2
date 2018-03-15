import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { SessionMiddleware } from './middlewares/session.middleware'
import { LoggerMiddleware } from './middlewares/logger.middleware'
import { ArticleModule } from './article/article.module';
import { AccountsModule } from './accounts/accounts.module'
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller'
import { CommonModule } from './common/common.module'



@Module({
    imports: [
        TypeOrmModule.forRoot(),
        ArticleModule,
        AccountsModule,
        CommonModule
    ],
    controllers:[AppController]
})
export class ApplicationModule implements NestModule {
    configure(consumer: MiddlewaresConsumer): void {
        consumer.apply([LoggerMiddleware,SessionMiddleware]).forRoutes(
            { path: '/', method: RequestMethod.ALL },
        );
    }
}