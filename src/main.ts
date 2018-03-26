import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './modules/app/app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter'
import { AnyExceptionFilter  } from './filters/any-exception.filter'
import { AuthGuard} from './guard/auth.guard'

async function bootstrap() {
	const app = await NestFactory.create(ApplicationModule);
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalFilters(new AnyExceptionFilter());
    app.useGlobalGuards(new AuthGuard());
	await app.listen(3080);
}
bootstrap();
