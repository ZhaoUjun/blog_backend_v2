import { Body, Controller, Get, HttpStatus, Req, Post} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAccountDto } from "../../dto/create-account.dto";
import { ResponseSignInDto } from "../../dto/response-sign-in.dto";
import { ResponseDto } from '../../dto/response.dto'
import { REDIS_SCHEMA, HTTP_ERROR_STATUS } from '../../constant'
import { JwtProvider } from '../../providers/jwt.provider'
import { NoNeedLogin} from '../../decorators/no-need-login'

@Controller('admin')
export class AdminController {
    constructor(
        private readonly accountService: AdminService,
        private readonly jwtProvider: JwtProvider
    ) {}

    @NoNeedLogin()
    @Post('sign-in')
    async signIn(@Body() createAccountDto: CreateAccountDto): Promise<ResponseDto<ResponseSignInDto>> {
        const responseVo= new ResponseDto();
        const sign_in_dto=new ResponseSignInDto();
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
        const token=await this.jwtProvider.createToken(createAccountDto.account);
        sign_in_dto.account=data.account;
        sign_in_dto.adminId=data.id;
        sign_in_dto.token=token;
        responseVo.data=sign_in_dto;
        return responseVo
    }

    @NoNeedLogin()
    @Post('sign-up')
    async signUp(@Body() createAccountDto: CreateAccountDto):Promise<ResponseDto<ResponseSignInDto>> {
        const responseVo= new ResponseDto();
        const sign_in_dto=new ResponseSignInDto();
        const redisKey=REDIS_SCHEMA.CAPTCHA+':'+createAccountDto.captcha;
        const isCorrect=await this.accountService.checkCaptcha(redisKey);
        if (!isCorrect){
            responseVo.setErrorResponse(HTTP_ERROR_STATUS.LOGIN_CAPTCHA_INCORRECT);
            return responseVo;
        }
        const data= await this.accountService.createAccount(createAccountDto);
        const token=await this.jwtProvider.createToken(createAccountDto.account);
        sign_in_dto.account=data.account;
        sign_in_dto.adminId=data.id;
        sign_in_dto.token=token;
        responseVo.data=sign_in_dto;
        return responseVo;
    }
}