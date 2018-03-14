import { Get, Controller, Response, Session,Request } from '@nestjs/common';
import captcha from 'captchapng'

@Controller()
export class AppController {

	@Get()
    root(): string {
        return 'Hello World!';
    }

    @Get('captcha')
    getCaptcha(@Session() session,@Response() res,@Request() req){
        const code=parseInt(Math.random()*9000+'1000');
        console.log(req,session)
        session.code=code;
        session.save(function (err) {
            const  p = new captcha(80,30,code); // width,height,numeric captcha 
            p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha) 
            p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha) 
            const  img = p.getBase64();
            const  imgbase64 = new Buffer(img,'base64');
            res.header('Content-Type', 'image/png');
            res.send(imgbase64);
        });
    }


}
