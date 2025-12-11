export interface IJwtTokens<T, V> {
	makeTokens(user: T): Promise<V>
}
