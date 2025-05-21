export interface IRepository <T, V> {
  add(item: T): Promise<T>

  // Novas features que eu to querendo fazer
  delete(id: string): Promise<V>
  findbyid(id: string): Promise<T | null>
}