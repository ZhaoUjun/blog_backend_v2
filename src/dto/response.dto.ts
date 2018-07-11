interface Error {
	code: number;
	msg: string;
}
export class ResponseDto<T> {
	public data?: T | any;
	public code?: number = 0;
	public msg?: string = '成功';

	public setErrorResponse(err: Error): void {
		this.code = err.code;
		this.msg = err.msg;
		this.data = false;
	}

	public setData(data: T): void {
		this.data = data;
	}
}
