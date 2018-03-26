import { Get, Controller, Response} from '@nestjs/common';
import captcha from 'captchapng'
import { CommonService } from '../common/common.service'

@Controller()
export class AppController {

    constructor(
        private commonService:CommonService,
){}

    @Get('captcha')
    async getCaptcha(@Response() res){
        const code=parseInt(Math.random()*9000+'1000');
        res.setHeader('Content-Type', 'image/png');
        res.send(await this.commonService.generateCaptcha(code.toString()))
    }
}
