export interface IManager<T, V> {
	handler(body: T): Promise<V>
}
