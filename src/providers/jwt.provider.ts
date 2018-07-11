import * as jwt from 'jsonwebtoken';
import { Injectable, Inject } from '@nestjs/common';
import { APP_CONFIG } from '../configs/app.config';
import { REDIS_SCHEMA } from '../constant';
import { RedisProvider } from './redis.provider';

interface SignData {
	token: string;
	account: string;
}

@Injectable()
export class JwtProvider {
	constructor(@Inject('RedisProvider') private redisProvider) {}

	async createToken(account: string): Promise<string> {
		const expiresIn = APP_CONFIG.TOKEN_EXPIRED_TIME;
		const token = jwt
			.sign({ account }, APP_CONFIG.APP_SECRET, { expiresIn })
			.slice(0, 16);
		await this.redisProvider.set(REDIS_SCHEMA.JWT_TOKEN + ':' + account, token);
		return token;
	}

	async validateToken(signData: SignData): Promise<boolean> {
		const accountToken = await this.redisProvider.get(
			REDIS_SCHEMA.JWT_TOKEN + ':' + signData.account,
		);
		return accountToken === signData.token;
	}
}
