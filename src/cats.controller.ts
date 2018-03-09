import { Controller, Get, Post, Res, Body, HttpStatus, Param,HttpException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { Observable } from 'rxjs'

@Controller('cats')
export class CatsController {
    @Post()
    create(@Res() res, @Body() createCatDto: CreateCatDto) {
        // TODO: Add some logic here
        res.status(HttpStatus.CREATED).send();
    }

    @Get()
    findAll() : Observable <any []> {
        throw new HttpException('This is a custom message',HttpStatus.FORBIDDEN);
        // return Observable.of([])
    }

    @Get(':id')
    findOne(@Param() params) {
        console.log(params.id);
        return {};
    }

}