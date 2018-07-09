import { Middleware, NestMiddleware, ExpressMiddleware } from '@nestjs/common';

@Middleware()
export class CorsMiddleware implements NestMiddleware {
    resolve(...args: any[]): ExpressMiddleware {
        return (req, res, next) => {
            res.header("Access-Control-Allow-Credentials", true);
            res.header("Access-Control-Allow-Origin", "http://119.23.255.113");
            res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
            res.header("Access-Control-Allow-Headers", "X-Requested-With,Authorization,Sign,Time,Content-Type,APPId,AppKey");
            next();
        };
    }
}