export interface IValideDto<T, V> {
	valideDto(request: V): Promise<T>
}
