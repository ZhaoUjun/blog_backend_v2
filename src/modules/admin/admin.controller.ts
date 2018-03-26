import { Body, Controller, Get, HttpStatus, Query, Post} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAccountDto } from "../../dto/create-account.dto";
import { ResponseDto } from '../../dto/response.dto'
import { REDIS_SCHEMA, HTTP_ERROR_STATUS } from '../../constant'


@Controller('admin')
export class AdminController {
    constructor(private readonly accountService: AdminService) {}

    @Post('sign-in')
    async signIn(@Body() createAccountDto: CreateAccountDto): Promise<ResponseDto<CreateAccountDto>> {
        const responseVo= new ResponseDto();
        const redisKey=REDIS_SCHEMA.CAPTCHA+':'+createAccountDto.captcha;
        const isCorrect=await this.accountService.checkCaptcha(redisKey);
        if (!isCorrect){
            responseVo.setErrorResponse(HTTP_ERROR_STATUS.LOGIN_CAPTCHA_INCORRECT);
            return responseVo;
        }
        const data = await this.accountService.findOne(createAccountDto);
        if (!data){
            responseVo.setErrorResponse(HTTP_ERROR_STATUS.LOGIN_ACCOUNT_INCORRECT);
            return responseVo
        }
        responseVo.data=data;
        return responseVo
    }

    @Post('sign-up')
    async signUp(@Body() createAccountDto: CreateAccountDto):Promise<ResponseDto<CreateAccountDto>> {
        const responseVo= new ResponseDto();
        const redisKey=REDIS_SCHEMA.CAPTCHA+':'+createAccountDto.captcha;
        const isCorrect=await this.accountService.checkCaptcha(redisKey);
        if (!isCorrect){
            responseVo.setErrorResponse(HTTP_ERROR_STATUS.LOGIN_CAPTCHA_INCORRECT);
            return responseVo;
        }
        responseVo.data= await this.accountService.createAccount(createAccountDto);
        return responseVo;
    }
}