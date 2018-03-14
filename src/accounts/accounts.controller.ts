import { Body, Controller, Get, HttpStatus, Query, Post} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from "../dto/create-account.dto";
import { ResponseVo } from '../utils/Response'

@Controller('article')
export class AccountsController {
    constructor(private readonly accountService: AccountsService) {}

    @Get()
    async signIn(createArticleDto: CreateAccountDto): Promise<ResponseVo> {
        const data = await this.accountService.findOne(createArticleDto);
        const responseVo= new ResponseVo();
        if (!data){
            responseVo.code=10;
            responseVo.msg='账号或者密码错误';
            return responseVo
        }
        responseVo.data=data;
        return responseVo
    }

    @Post()
    async signUp(@Body() createArticleDto: CreateAccountDto):Promise<ResponseVo> {
        await this.accountService.createAccount(createArticleDto);
        return new ResponseVo();
    }
}