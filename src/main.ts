import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter'
import { AnyExceptionFilter  } from './filters/any-exception.filter'

async function bootstrap() {
	const app = await NestFactory.create(ApplicationModule);
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalFilters(new AnyExceptionFilter());
	await app.listen(3080);
}
bootstrap();
