import { Body, Controller, Get, HttpStatus, Query, Post } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from '../../dto/create-article.dto';
import { TagsDto } from '../../dto/tags.dto';
import { ResponseDto } from '../../dto/response.dto';

@Controller('article')
export class ArticleController {
	constructor(private readonly articleService: ArticleService) {}

	@Get()
	async findAll(
		@Query('tagId') tagId?: number,
		@Query('pageNo') pageNo?: number,
	): Promise<ResponseDto<CreateArticleDto[]>> {
		const data = await this.articleService.findAll(tagId, pageNo);
		const responseDto = new ResponseDto();
		responseDto.data = data;
		return responseDto;
	}

	@Post()
	async create(
		@Body() createArticleDto: CreateArticleDto,
	): Promise<ResponseDto<CreateArticleDto>> {
		await this.articleService.createArticle(createArticleDto);
		return new ResponseDto();
	}

	@Get('tags')
	async getAllTags(): Promise<ResponseDto<TagsDto[]>>{
        const data = await this.articleService.findAllTags();
        const responseDto = new ResponseDto();
        responseDto.data = data;
        return responseDto;
	}
}
