import { Middleware, NestMiddleware, ExpressMiddleware } from '@nestjs/common';
import * as  session from 'express-session'
import { SESSION_CONFIG } from '../configs/session_config'

@Middleware()
export class SessionMiddleware implements NestMiddleware {
    resolve(): ExpressMiddleware {
        return session(SESSION_CONFIG);
    }
}