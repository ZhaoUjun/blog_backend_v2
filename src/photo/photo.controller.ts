import {Body, Controller, Get, HttpStatus, Res, Post} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { Photo } from './photo.entity';
import { CreatePhotoDto } from "../dto/create-photo.dto";

@Controller('photo')
export class PhotoController {
    constructor(private readonly photoService: PhotoService) {}

    @Get()
    findAll(): Promise<Photo[]> {
        return this.photoService.findAll();
    }

    @Post()
    create(@Res() res, @Body() createPhotoDto: CreatePhotoDto) {
        // TODO: Add some logic here
        res.status(HttpStatus.CREATED).send();
    }
}