export interface IController<V> {
	handler(httpContext: V): Promise<void>
}
