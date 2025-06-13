export interface IRepository <T, V> {
  add(item: T): Promise<T>
  // update(item: T): Promise<T>
  delete(id: string): Promise<V>
  findbyid(id: string): Promise<T | null>
  listAll(): Promise<V | null> // ve aforma que esta acontecendo e começar daqui a codar
  // findbyemail(email: string): Promise<V | null>
}