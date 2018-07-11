import {
	Injectable,
	CanActivate,
	ExecutionContext,
	Inject,
} from '@nestjs/common';
import 'reflect-metadata';
import { REDIS_SCHEMA } from '../constant/index';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(@Inject('RedisProvider') private redisProvider) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		if (
			Reflect.hasMetadata('NoNeedLogin', context.getClass()) ||
			Reflect.hasMetadata('NoNeedLogin', context.getHandler())
		) {
			return true;
		}
		const { account } = request.header;
		return await this.redisProvider.get(REDIS_SCHEMA.JWT_TOKEN + ':' + account);
	}
}
