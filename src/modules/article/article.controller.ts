import { Body, Controller, Get, HttpStatus, Query, Post} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from "../../dto/create-article.dto";
import { ResponseDto } from '../../dto/response.dto'

@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @Get()
    async findAll(@Query('tagId') tagId?:number,@Query('pageNo') pageNo?:number): Promise<ResponseDto<CreateArticleDto>> {
        const data = await this.articleService.findAll(tagId,pageNo);
        const responseVo= new ResponseDto();
        responseVo.data=data;
        return responseVo
    }

    @Post()
    async create(@Body() createArticleDto: CreateArticleDto):Promise<ResponseDto<CreateArticleDto>> {
        await this.articleService.createArticle(createArticleDto);
        return new ResponseDto();
    }
}