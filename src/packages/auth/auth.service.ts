import { loginUserSchema, registerUserSchema } from './auth.schema';
import z from "zod";
import promiseWrapper from "../../lib/promise_wrapper";
import { AuthRepository } from "./auth.repo";
import { AuthError } from '../../lib/api_error';
import { generateHashedPassword, isPasswordValid } from '../../core/utils/auth/password';
import { generateAccessToken } from '../../core/utils/auth/jwt';
import { toUserDTO } from '.';


export class AuthService {
  private readonly authRepository: AuthRepository

  constructor(authRepository: AuthRepository){
    this.authRepository = authRepository
  }

  public loginUser = async ({ email, password }: z.infer<typeof loginUserSchema>) => promiseWrapper(
    async (resolve, reject) => {
      const user = await this.authRepository.findUserByEmail(email)      

      if(!user) {
        const userNotFoundError = new AuthError(
          "No user was found with this email"
        )

        return reject(userNotFoundError)
      }

      const is_password_valid = await isPasswordValid({
        hashed: user.password,
        plain: password
      })

      if(!is_password_valid) {
        const passwordNotMatchError = new AuthError("Password is incorrect")
        return reject(passwordNotMatchError)
      }

      const access_token = generateAccessToken(user)

      return resolve({
        user: toUserDTO(user),
        access_token
      })
    }
  )
  
  public getCurrentUser = async (user_id: number) => promiseWrapper(
    async (resolve, reject) => {
      const user = await this.authRepository.findUserById(user_id)

      if(!user) {
        const userNotFoundError = new AuthError(
          "No user was found"
        )

        return reject(userNotFoundError)
      }
      
      return resolve(
        toUserDTO(user)
      )
    }
  )

  public registerUser = async ({ name, email, password }: z.infer<typeof registerUserSchema>) => promiseWrapper(
    async (resolve, reject) => {
      const hashedPassword = await generateHashedPassword(password)

      const search = await this.authRepository.findUserByEmail(email)

      if(search) {
        const userAlreadyExistsError = new AuthError(
          "Email is taken"
        )

        return reject(userAlreadyExistsError)
      }

      const user = await this.authRepository.insert({
        name,
        email,
        password: hashedPassword
      })


      const access_token = generateAccessToken(user)

      return resolve({
        user: toUserDTO(user),
        access_token
      })
    }
  )
}