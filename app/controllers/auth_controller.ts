import User from '#models/user'
import { loginValidator } from '#validators/auth/login'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  async login({ auth, request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)
    const user = await User.findBy('email', email)

    if (!user || !hash.verify(user.password, password)) {
      return response.badRequest({
        message: "Email or password didn't match",
      })
    }

    const tokens = await auth.use('jwt').generate(user)
    response.ok({ ...tokens, user })
  }
}
