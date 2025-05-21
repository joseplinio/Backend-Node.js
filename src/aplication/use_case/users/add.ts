import { injectable, inject} from "tsyringe"
import { UserRepository } from "../../../adapters/spi/repositorys/user-repository"
import type { UserEntity } from "../../../domains/user-entity"
import type { IUseCase } from "../case"
import { IUserRepository } from "../../interface/repository/IUserRepository"

@injectable() // Permite que o container injete coisas nessa classe
export class UserAddCase implements IUseCase<UserEntity, UserEntity> {
	// Pesso para montar a class com o UserRepository ja injetando sem fazer um new
	constructor(@inject(UserRepository) private userRepository: IUserRepository) {}

  handler(body: UserEntity): Promise<UserEntity> {
    return this.userRepository.add(body)
  }
}
