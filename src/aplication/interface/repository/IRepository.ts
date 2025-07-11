export interface IRepository<T, V> {
	add(item: T): Promise<T>
	// update(item: T): Promise<T>
	delete(item: string): Promise<V>
	listAll(): Promise<T[] | null>
	findAny(item: any, limit?: number): Promise<T[] | null>
	findByEmail(item: string): Promise<T | null>
}
