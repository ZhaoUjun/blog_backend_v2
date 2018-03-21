import { Body, Controller, Get, HttpStatus, Query, Post} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAccountDto } from "../dto/create-account.dto";
import { ResponseVo } from '../utils/Response'
import { REDIS_SCHEMA } from '../constant'


@Controller('admin')
export class AdminController {
    constructor(private readonly accountService: AdminService) {}

    @Post('sign-in')
    async signIn(@Body() createAccountDto: CreateAccountDto): Promise<ResponseVo> {
        const responseVo= new ResponseVo();
        const redisKey=REDIS_SCHEMA.CAPTCHA+':'+createAccountDto.captcha;
        const isCorrect=await this.accountService.checkCaptcha(redisKey);
        if (!isCorrect){
            responseVo.data=false;
            responseVo.code=10;
            responseVo.msg='验证码错误';
            return responseVo;
        }
        const data = await this.accountService.findOne(createAccountDto);
        if (!data){
            responseVo.code=10;
            responseVo.msg='账号或者密码错误';
            return responseVo
        }
        responseVo.data=data;
        return responseVo
    }

    @Post('sign-up')
    async signUp(@Body() createAccountDto: CreateAccountDto):Promise<ResponseVo> {
        const responseVo= new ResponseVo();
        const redisKey=REDIS_SCHEMA.CAPTCHA+':'+createAccountDto.captcha;
        const isCorrect=await this.accountService.checkCaptcha(redisKey);
        if (!isCorrect){
            responseVo.data=false;
            responseVo.code=10;
            responseVo.msg='验证码错误';
            return responseVo;
        }
        responseVo.data= await this.accountService.createAccount(createAccountDto);
        return responseVo;
    }
}