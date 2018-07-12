import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { Article } from '../../entity/article.entity';
import { Tag } from '../../entity/tag.entity';
import { Author } from '../../entity/author.entity';
import { CreateArticleDto } from '../../dto/create-article.dto';
import { withPagination } from '../../utils';

@Injectable()
export class ArticleService {
	constructor(
		@InjectRepository(Article)
		private readonly ArticleRepository: Repository<Article>,
	) {}

    /***
	 * 查找文章
     * @param {number} tagId
     * @param {number} page
     * @param {number} pageSize
     * @returns {Promise<Article[]>}
     */
	async findAll(
		tagId?: number,
		page?: number,
		pageSize?: number,
	): Promise<Article[]> {
		const ql = await this.ArticleRepository.createQueryBuilder(
			'article',
		).innerJoinAndSelect('article.author', 'author');
		if (!tagId) {
			return withPagination(ql.leftJoinAndSelect('article.tags', 'tags'), page);
		}
		return withPagination(
			ql
				.innerJoinAndSelect('article.tags', 'tag')
				.where('tag.id = :tagId', { tagId }),
			page,
		);
	}

    /***
	 * 新增文章
     * @param {CreateArticleDto} createArticleDto
     * @returns {Promise<Article>}
     */
	async createArticle(createArticleDto: CreateArticleDto): Promise<Article> {
		const article = new Article();
		const tagRepository = getRepository(Tag);
		const authorRepository = getRepository(Author);
		article.tags = await tagRepository.findByIds(createArticleDto.tagIds);
		article.author = await authorRepository.findOne(createArticleDto.authorId);
		article.title = createArticleDto.title;
		article.content = createArticleDto.content;
		const {index}=/\<\/br\>/.exec(article.content);
		article.preview = createArticleDto.content.slice(0, index);
		return await this.ArticleRepository.save(article);
	}

    /***
	 * 查找所有标签
     * @returns {Promise<Tag[]>}
     */
	async findAllTags(): Promise<Tag[]>{
        const tagRepository = getRepository(Tag);
        return tagRepository.find();
	}
}
