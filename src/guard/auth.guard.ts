import {Guard, CanActivate, ExecutionContext} from '@nestjs/common';
import 'reflect-metadata';

@Guard()
export class AuthGuard implements CanActivate {
    async canActivate(req, context: ExecutionContext):Promise<boolean>{
        return Reflect.hasMetadata('NoNeedLogin',context.parent)?true:
            Reflect.hasMetadata('NoNeedLogin',context.handler)
    }
}