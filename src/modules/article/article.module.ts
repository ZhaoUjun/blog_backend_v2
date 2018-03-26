import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { Article } from '../../entity/article.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Article])],
    components: [ArticleService],
    controllers: [ArticleController],
})
export class ArticleModule {}