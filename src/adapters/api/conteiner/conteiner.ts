import { UserRepository } from "src/adapters/spi/repositories/user-repository"
import serviceHashPassword from "src/aplication/service/password/passwordService"
import { dtoValidator } from "src/aplication/use_case/dto/userValideDto"
import { UserAddCase } from "src/aplication/use_case/users/add"
import { UserDeleteCase } from "src/aplication/use_case/users/delete"
import { UserListCase } from "src/aplication/use_case/users/list"
import { container } from "tsyringe"
import { UserAddController } from "../http/users/controllers/add"
import { UserDeleteController } from "../http/users/controllers/delete"
import { UserListerController } from "../http/users/controllers/list"
import { AdapterExpress } from "../server/express/expressAdapter"

// UserControllers
container.register<UserAddController>("UserAddController", UserAddController)
container.register<UserDeleteController>(
	"UserDeleteController",
	UserDeleteController,
)
container.register<UserListerController>(
	"UserListerController",
	UserListerController,
)
// UserDto e Adatepter Servicer
container.register<dtoValidator>("dtoValidator", dtoValidator)

container.register<serviceHashPassword>(
	"serviceHashPassword",
	serviceHashPassword,
)

container.register<AdapterExpress>("AdapterExpress", AdapterExpress)

// UserRepositors
container.register<UserRepository>("UserRepository", UserRepository)

// UserCases
container.register<UserDeleteCase>("UserDeleteCase", UserDeleteCase)
container.register<UserAddCase>("UserAddCase", UserAddCase)
container.register<UserListCase>("UserListCase", UserListCase)
