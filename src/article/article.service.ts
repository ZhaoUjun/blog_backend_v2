import { Component, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,getRepository } from 'typeorm';
import { Article } from '../entity/article.entity';
import { Tag } from '../entity/tag.entity';
import { Author } from '../entity/author.entity';
import { CreateArticleDto } from '../dto/create-article.dto'

@Component()
export class ArticleService {
    constructor(
        @InjectRepository(Article)
        private readonly ArticleRepository: Repository<Article>,
    ) {}

    async findAll(): Promise<Article[]> {
        return await this.ArticleRepository
                .createQueryBuilder('article')
                .innerJoinAndSelect('article.author','author')
                .leftJoinAndSelect('article.tags','tags')
                .getMany()
    }

    async createArticle(createArticleDto: CreateArticleDto): Promise<Article> {
        const article=new Article();
        const tagRepository = getRepository(Tag);
        const authorRepository = getRepository(Author);
        article.tags =await tagRepository.findByIds(createArticleDto.tagIds);
        article.author=await authorRepository.findOneById(createArticleDto.authorId);
        article.title=createArticleDto.title;
        article.content=createArticleDto.content;
        article.preview=createArticleDto.content.slice(0,25);
        return await this.ArticleRepository.save(article)
    }
}