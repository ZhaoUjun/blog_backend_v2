import { Body, Controller, Get, HttpStatus, Res, Post} from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from '../entity/article.entity';
import { CreatePhotoDto } from "../dto/create-photo.dto";

@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @Get()
    findAll(): Promise<Article[]> {
        return this.articleService.findAll();
    }

    @Post()
    create(@Res() res, @Body() createPhotoDto: CreatePhotoDto) {
        // TODO: Add some logic here
        res.status(HttpStatus.CREATED).send();
    }
}