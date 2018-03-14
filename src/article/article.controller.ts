import { Body, Controller, Get, HttpStatus, Res, Post} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from "../dto/create-article.dto";
import { ResponseVo } from '../utils/Response'

@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @Get()
    async findAll(): Promise<ResponseVo> {
        const data = await this.articleService.findAll();
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