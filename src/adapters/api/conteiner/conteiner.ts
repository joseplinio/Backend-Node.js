import { UserRepository } from "src/adapters/spi/repositories/user-repository"
import serviceHashPassword from "src/aplication/service/password/passwordService"
import { UserAddCase } from "src/aplication/use_case/users/add"
import { UserDeleteCase } from "src/aplication/use_case/users/delete"
import { DtoDeleteUser } from "src/aplication/use_case/users/dto/dtoDeleteUser"
import { DtoValidator } from "src/aplication/use_case/users/dto/valideDto"
import { UserFindCase } from "src/aplication/use_case/users/find"
import { UserListCase } from "src/aplication/use_case/users/list"
import { container } from "tsyringe"
import { UserAddController } from "../http/users/controllers/add"
import { UserDeleteController } from "../http/users/controllers/delete"
import { UserFindController } from "../http/users/controllers/find"
import { UserListController } from "../http/users/controllers/list"
import { AdapterExpress } from "../server/express/expressAdapter"

// Controllers
container.register<UserAddController>("UserAddController", UserAddController)
container.register<UserDeleteController>(
	"UserDeleteController",
	UserDeleteController,
)
container.register<UserFindController>("UserFindController", UserFindController)
container.register<UserListController>("UserListController", UserListController)
// Dto e Adatepter Servicer
container.register<DtoValidator>("DtoValidator", DtoValidator)
container.register<DtoDeleteUser>("DtoDeleteUser", DtoDeleteUser)

container.register<serviceHashPassword>(
	"serviceHashPassword",
	serviceHashPassword,
)
container.register<AdapterExpress>("AdapterExpress", AdapterExpress)

// Repositors
container.register<UserRepository>("UserRepository", UserRepository)

// Cases
container.register<UserDeleteCase>("UserDeleteCase", UserDeleteCase)
container.register<UserAddCase>("UserAddCase", UserAddCase)
container.register<UserListCase>("UserListCase", UserListCase)
container.register<UserFindCase>("UserFindCase", UserFindCase)
