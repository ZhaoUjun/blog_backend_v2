import { ExceptionFilter, Catch, ArgumentsHost  } from '@nestjs/common';

@Catch()
export class AnyExceptionFilter implements ExceptionFilter {
	catch(exception, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        console.log(exception);
		response.status(500).json({
			code: 500,
			msg: `霸王机歇菜了`,
		});
	}
}
