import type { IController } from "./IController";

// Representa um roteador genérico, onde cada rota é uma chave string ('add', 'update') e aponta para um controller.
export interface IRouter<T = Record<string, any>, V = Record<string, any>> {
  routers: Record<string, IController<any, any>>

  // Faz o modo que queremos executar com o corpo tambem
  execRoute(route: string, body: T): Promise<V | null>
}