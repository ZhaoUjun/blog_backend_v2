import { Component,  } from '@nestjs/common';
import { RedisService } from './redis.service'
import { REDIS_SCHEMA } from '../constant'
import * as captcha from 'captchapng'

const CAPTCHA_SIZE={
    WIDTH:80,
    HEIGHT:30
}

@Component()
export class CommonService {

    constructor( private redisSevice:RedisService){}

    async generateCaptcha(code:string):Promise<Buffer>{
        await this.redisSevice.setVal(REDIS_SCHEMA.CAPTCHA+code,code,'EX',60);
        const  p = captcha(CAPTCHA_SIZE.WIDTH,CAPTCHA_SIZE.HEIGHT,code); // width,height,numeric captcha 
        p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha) 
        p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha) 
        const  img = p.getBase64();
        return new Buffer(img,'base64');
    }

    async checkCaptcha(code:string):Promise<boolean>{
        const result=await this.redisSevice.getVal(code);
        return Boolean(result)
    }

}