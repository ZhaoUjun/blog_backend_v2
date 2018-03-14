import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { SessionMiddleware } from './middlewares/session.middleware'
import { ArticleModule } from './article/article.module';
import { AccountsModule } from './accounts/accounts.module'
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller'


@Module({
    imports: [
        TypeOrmModule.forRoot(),
        ArticleModule,
        AccountsModule
    ],
    controllers:[AppController]
})
export class ApplicationModule implements NestModule {
    configure(consumer: MiddlewaresConsumer): void {
        consumer.apply(SessionMiddleware).forRoutes(
            { path: '/', method: RequestMethod.ALL },
        );
    }
}