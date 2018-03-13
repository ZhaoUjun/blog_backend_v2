import { Component, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../entity/article.entity';

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
}