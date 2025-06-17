export interface IRepository<T, V> {
	add(item: T): Promise<T>
	// update(item: T): Promise<T>
	delete(id: string): Promise<V>
	listAll(): Promise<V | null>
}
