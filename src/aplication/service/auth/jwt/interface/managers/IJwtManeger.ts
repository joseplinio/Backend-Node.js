export interface IJwtSession<T, V> {
	makeSession(user: T): Promise<V>
}
