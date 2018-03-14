import { Body, Controller, Get, HttpStatus, Query, Post} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from "../dto/create-article.dto";
import { ResponseVo } from '../utils/Response'

@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @Get()
    async findAll(@Query('tagId') tagId?:number): Promise<ResponseVo> {
        const data = await this.articleService.findAll(tagId);
        const responseVo= new ResponseVo();
        responseVo.data=data;
        return responseVo
    }



    @Post()
    async create(@Body() createArticleDto: CreateArticleDto):Promise<ResponseVo> {
        await this.articleService.createArticle(createArticleDto);
        return new ResponseVo();
    }
}