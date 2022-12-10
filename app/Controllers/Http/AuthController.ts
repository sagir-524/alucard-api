import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { UserService } from 'App/Services/UserService'
import Database from '@ioc:Adonis/Lucid/Database'
import UserRegistrationRequestValidator from 'App/Validators/Auth/UserRegistrationRequestValidator'
import EmailVerificationRequestValidator from 'App/Validators/Auth/EmailVerificationRequestValidator'
import ResendVerificationEmailRequestValidator from 'App/Validators/Auth/ResendVerificationEmailRequestValidator'

export default class AuthController {
  public async register({ auth, request, response }: HttpContextContract): Promise<void> {
    await request.validate(UserRegistrationRequestValidator)
    const trx = await Database.transaction()

    try {
      const user = await User.create({
        firstname: request.input('firstname'),
        lastname: request.input('lastname'),
        email: request.input('email'),
        password: request.input('password'),
      })

      await UserService.sendUserVerificationEmail(user)
      await trx.commit()

      const authenticatedResponse = UserService.generateAuthTokens(user, auth)
      response.ok(authenticatedResponse)
    } catch {
      await trx.rollback()
      response.internalServerError()
    }
  }

  public async resendVerificationEmail({ request, response }: HttpContextContract): Promise<void> {
    await request.validate(ResendVerificationEmailRequestValidator)
    const user = await UserService.getUserByEmailOrFail(request.input('email'), false)
    await UserService.sendUserVerificationEmail(user)
    response.noContent()
  }

  public async verify({ request, response }: HttpContextContract): Promise<void> {
    await request.validate(EmailVerificationRequestValidator)
    const verificationCode = request.input('verificationCode')
    const verificationUri = request.input('verificationUri')
    const user = await UserService.getUserByEmailOrFail(request.input('email'), false)
    const res = await UserService.verifyUser(user, verificationUri, verificationCode)

    if (res) {
      response.noContent()
    } else {
      response.notFound()
    }
  }
}
