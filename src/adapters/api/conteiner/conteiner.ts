import { UserRepository } from "src/adapters/spi/repositories/userRepository"
import { UserSessionRepository } from "src/adapters/spi/repositories/userSessionRepository"
import { HashService } from "src/aplication/interface/service/hash/hashService"
import { HashManeger } from "src/aplication/interface/service/hash/menager/hashManeger"
import { JwtSession } from "src/aplication/service/auth/jwt/jwtSerSension"
import { JwtService } from "src/aplication/service/auth/jwt/jwtService"
import { accessTokenService } from "src/aplication/service/auth/jwt/subServices/accessTokenService" 
import { RefershTokenService } from "src/aplication/service/auth/jwt/subServices/refershTokenService"
import { UserSessionAddCase } from "src/aplication/use_case/userSession/cases/session/add"
import { RefreshTokenCase } from "src/aplication/use_case/userSession/cases/jwt/refresh"
import { UserAddCase } from "src/aplication/use_case/users/cases/add"
import { UserDeleteCase } from "src/aplication/use_case/users/cases/delete"
import { UserFindCase } from "src/aplication/use_case/users/cases/find"
import { UserListCase } from "src/aplication/use_case/users/cases/list"
import { UserLoginCase } from "src/aplication/use_case/users/cases/login"
import { DtoDeleteUser } from "src/aplication/use_case/users/dto/dtoDeleteUser"
import { DtoValidator } from "src/aplication/use_case/valideDto"
import { container } from "tsyringe"
import { UserDeleteController } from "../http/admin/controllers/delete"
import { UserFindController } from "../http/admin/controllers/find"
import { UserListController } from "../http/admin/controllers/list"
import { UserLoginController } from "../http/auth/controllers/login"
import { RefreshTokenController } from "../http/auth/controllers/refresh"
import { UserAddController } from "../http/users/controllers/add"

// -- RegisterSingleton
// Repository
container.registerSingleton<UserRepository>("UserRepository", UserRepository)
container.registerSingleton<UserSessionRepository>(
	"UserSessionRepository",
	UserSessionRepository,
)

// Service
container.registerSingleton<JwtService>("JwtService", JwtService)
container.register<HashService>("HashService", HashService)
container.register<RefershTokenService>(
	"RefershTokenService",
	RefershTokenService,
)
container.register<accessTokenService>("AccessTokenService", accessTokenService)
// Session / Auth
container.registerSingleton<JwtSession>("JwtSession", JwtSession)
container.registerSingleton<HashManeger>("HashManeger", HashManeger)
// --- Register

// Controller
container.register<RefreshTokenController>(
	"RefreshTokenController",
	RefreshTokenController,
)
container.register<UserFindController>("UserFindController", UserFindController)
container.register<UserListController>("UserListController", UserListController)
container.register<UserAddController>("UserAddController", UserAddController)
container.register<UserDeleteController>(
	"UserDeleteController",
	UserDeleteController,
)
container.register<UserLoginController>(
	"UserLoginController",
	UserLoginController,
)
// Dto
container.register<DtoValidator>("DtoValidator", DtoValidator)
container.register<DtoDeleteUser>("DtoDeleteUser", DtoDeleteUser)
// Case

container.register<UserSessionAddCase>("UserSessionAddCase", UserSessionAddCase)
container.register<RefreshTokenCase>("RefreshTokenCase", RefreshTokenCase)
container.register<UserLoginCase>("UserLoginCase", UserLoginCase)
container.register<UserDeleteCase>("UserDeleteCase", UserDeleteCase)
container.register<UserAddCase>("UserAddCase", UserAddCase)
container.register<UserListCase>("UserListCase", UserListCase)
container.register<UserFindCase>("UserFindCase", UserFindCase)
