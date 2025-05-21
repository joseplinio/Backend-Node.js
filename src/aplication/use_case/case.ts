// Interface usada para modelar os processos do UseCase

export interface IUseCase<T, V> {
  handler(body: T): Promise<V> // O metoda que manipula o dados recebidos
}