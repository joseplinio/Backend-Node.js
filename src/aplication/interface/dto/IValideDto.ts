export interface IValideDto<_T, U> {
	valideDto<T extends object>(dtoClass: new () => T, data: U): Promise<T>
}
