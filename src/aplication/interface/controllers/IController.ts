// Noldando o a interface do controle onde ele vai ter um tipo (T)
// E pode retorna outro (V)

export interface IController<T, V>{
  handler(body: T): Promise<V>
}
