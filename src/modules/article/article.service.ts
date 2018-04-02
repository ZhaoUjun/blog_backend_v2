import { Component, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,getRepository } from 'typeorm';
import { Article } from '../../entity/article.entity';
import { Tag } from '../../entity/tag.entity';
import { Author } from '../../entity/author.entity';
import { CreateArticleDto } from '../../dto/create-article.dto'
import { withPagination } from '../../utils'

@Component()
export class ArticleService {
    constructor(
        @InjectRepository(Article)
        private readonly ArticleRepository: Repository<Article>,
    ) {}

    async findAll(tagId?:number,page?:number,pageSize?:number): Promise<Article[]> {
        const ql=await this.ArticleRepository
                .createQueryBuilder('article')
                .innerJoinAndSelect('article.author','author');
        if (!tagId){
            return  withPagination(ql.leftJoinAndSelect('article.tags','tags'),page)
        }
        return withPagination(
            ql.innerJoinAndSelect('article.tags','tag').where('tag.id = :tagId',{tagId}),
            page
        )
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