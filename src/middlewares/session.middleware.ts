import { Injectable, NestMiddleware, MiddlewareFunction } from '@nestjs/common';
import * as session from 'express-session';
import { SESSION_CONFIG } from '../configs/session_config';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
	resolve(): MiddlewareFunction {
		return session(SESSION_CONFIG);
	}
}
