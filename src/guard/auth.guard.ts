import {Guard, CanActivate, ExecutionContext, Inject} from '@nestjs/common';
import 'reflect-metadata';
import { REDIS_SCHEMA } from '../constant/index'

@Guard()
export class AuthGuard implements CanActivate {

    constructor( @Inject('RedisProvider') private redisProvider){}

    async canActivate(req, context: ExecutionContext):Promise<boolean>{
        if(Reflect.hasMetadata('NoNeedLogin',context.parent)||Reflect.hasMetadata('NoNeedLogin',context.handler)){
            return true
        }
        const {account}=req.header;
        return await this.redisProvider.get(REDIS_SCHEMA.JWT_TOKEN+':'+account)
    }
}