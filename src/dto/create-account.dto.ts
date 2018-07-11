export class CreateAccountDto {
	readonly password: string;
	readonly account: string;
	readonly captcha: string;
}
