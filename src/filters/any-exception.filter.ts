import { ExceptionFilter, Catch } from '@nestjs/common';

@Catch()
export class AnyExceptionFilter implements ExceptionFilter {
    catch(exception, response) {
        console.log(exception);
        response
            .status(500)
            .json({
                code: 500,
                msg: `霸王机歇菜了`
            });
    }
}