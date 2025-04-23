import { User } from "../models/user";

export abstract class IUserRepository {
  abstract save(user: User): Promise < User >
}