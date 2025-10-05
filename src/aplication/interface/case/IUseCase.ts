export interface IUseCase<T, V> {
	handler(body: T): Promise<V>
}
