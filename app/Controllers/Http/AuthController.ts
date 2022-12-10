import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { UserService } from 'App/Services/UserService'
import Database from '@ioc:Adonis/Lucid/Database'
import UserRegistrationRequestValidator from 'App/Validators/Auth/UserRegistrationRequestValidator'
import UserVerificationRequestValidator from 'App/Validators/Auth/UserVerificationRequestValidator'

export default class AuthController {
  public async register({ request, response }: HttpContextContract): Promise<void> {
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
      response.ok(user)
    } catch {
      await trx.rollback()
      response.internalServerError()
    }
  }

  public async verify({ request, response }: HttpContextContract): Promise<void> {
    await request.validate(UserVerificationRequestValidator)
    const verificationCode = request.input('verificationCode')
    const verificationUri = request.input('verificationUri')
    const user = await User.query()
      .withScopes((query) => query.pending())
      .where('email', request.input('email'))
      .firstOrFail()
    const res = await UserService.verifyUser(user, verificationUri, verificationCode)

    if (res) {
      response.ok('Your email is verified successfully.')
    } else {
      response.notFound()
    }
  }
}
