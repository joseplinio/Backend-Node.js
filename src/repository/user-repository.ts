import { db } from "../db";
import { usersTable } from "../db/schema";
import type { IUserRepository } from "../interface/user-repository-interface";
import type { User } from "../models/user";
import { HashPassWord } from "../utils/security/hash-pass-word";

const hashPassWord = new HashPassWord()

export class UserRepository implements IUserRepository {
  async save(user: User): Promise<User> {
    const saved = await db.insert(usersTable).values({
      id: user.id,
      name: user.name,
      age: user.age,
      hashPassWord: await hashPassWord.hash(user.hashPassWord)
    }).returning()


    // Mecher no modos de tipo do retorno da table
    return saved[0]
  }
  
}