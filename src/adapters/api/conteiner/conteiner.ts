import { TokenRepository } from "src/adapters/spi/repositories/tokenRepository"
import { UserRepository } from "src/adapters/spi/repositories/userRepository"
import { JwtService } from "src/aplication/service/auth/jwt/jwtService"
import serviceHashItem from "src/aplication/service/auth/password/hashItemService"
import { UserAddCase } from "src/aplication/use_case/users/add"
import { UserDeleteCase } from "src/aplication/use_case/users/delete"
import { DtoDeleteUser } from "src/aplication/use_case/users/dto/dtoDeleteUser"
import { DtoValidator } from "src/aplication/use_case/users/dto/valideDto"
import { UserFindCase } from "src/aplication/use_case/users/find"
import { UserListCase } from "src/aplication/use_case/users/list"
import { UserLoginCase } from "src/aplication/use_case/users/login"
import { container } from "tsyringe"
import { UserAddController } from "../http/users/controllers/routers/add"
import { UserDeleteController } from "../http/users/controllers/routers/delete"
import { UserFindController } from "../http/users/controllers/routers/find"
import { UserListController } from "../http/users/controllers/routers/list"
import { UserLoginController } from "../http/users/controllers/routers/login"

// RegisterSingleton
container.registerSingleton<UserRepository>("UserRepository", UserRepository)
container.registerSingleton<TokenRepository>("TokenRepository", TokenRepository)
container.registerSingleton<JwtService>("JwtService", JwtService)

// Register
container.register<UserFindController>("UserFindController", UserFindController)
container.register<UserListController>("UserListController", UserListController)
container.register<DtoValidator>("DtoValidator", DtoValidator)
container.register<DtoDeleteUser>("DtoDeleteUser", DtoDeleteUser)
container.register<serviceHashItem>("serviceHashItem", serviceHashItem)
container.register<UserLoginCase>("UserLoginCase", UserLoginCase)
container.register<UserDeleteCase>("UserDeleteCase", UserDeleteCase)
container.register<UserAddCase>("UserAddCase", UserAddCase)
container.register<UserListCase>("UserListCase", UserListCase)
container.register<UserFindCase>("UserFindCase", UserFindCase)
container.register<UserAddController>("UserAddController", UserAddController)
container.register<UserDeleteController>(
	"UserDeleteController",
	UserDeleteController,
)
container.register<UserLoginController>(
	"UserLoginController",
	UserLoginController,
)
