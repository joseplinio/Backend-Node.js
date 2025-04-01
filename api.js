import argon2 from "argon2";
async function getResponseApi(api) {
  // Api to github for user how  : https://api.github.users/joseplinio
  fetch(api)
}
export async function createrHash({ name }) {
  try {
    const hash = await argon2.hash(name)
    return hash

  } catch (err) {
    console.error(err)
  }
  
}
export async function validHash(hash, pw) {
  try {
    console.log(pw)
    console.log(hash)
    await argon2.verify(hash, pw)
  } catch (err) {
    console.error(err)
  }
}

async function run (user) {
  const password = await createrHash(user)
  console.log(password ? `Your password!: ${password}` : 'Erro')

  rl.question('Re enter your password: ', async (pw) => {
    const validation = await validHash(password, pw)
    console.log(validation ? 'Valid' : 'invalid' )

  })
}
