import { ExceptionFilter, Catch } from '@nestjs/common';
import { HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, response) {
        const status = exception.getStatus();

        response
            .status(status)
            .json({
                code: status,
                msg: exception.message,
            });
    }
}