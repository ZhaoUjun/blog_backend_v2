import { Injectable, NestMiddleware, MiddlewareFunction, Request, Response } from '@nestjs/common';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
	resolve(...args: any[]): MiddlewareFunction {
		return (req: Request, res, next) => {
			res.header('Access-Control-Allow-Credentials', true);
            // res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
            res.header('Access-Control-Allow-Origin', 'http://119.23.255.113');
			res.header(
				'Access-Control-Allow-Methods',
				'PUT, GET, POST, DELETE, OPTIONS',
			);
			res.header(
				'Access-Control-Allow-Headers',
				'X-Requested-With,Authorization,Sign,Time,Content-Type,APPId,AppKey',
			);
            if (req.method === 'OPTIONS'){
                return res.end();
            }
			next();
		};
	}
}
