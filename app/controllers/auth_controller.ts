import RefreshToken from '#models/refresh_token'
import User from '#models/user'
import env from '#start/env'
import { loginValidator } from '#validators/auth/login'
import { refreshValidator } from '#validators/auth/refresh'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import jwt from 'jsonwebtoken'

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

  async refresh({ auth, request, response }: HttpContext) {
    const payload = await request.validateUsing(refreshValidator)

    if (jwt.verify(payload.refreshToken, env.get('APP_KEY'))) {
      const refreshToken = await RefreshToken.query()
        .withScopes((query) => query.valid())
        .where('refreshToken', payload.refreshToken)
        .first()

      if (refreshToken) {
        await refreshToken.load('user')
        const tokens = await auth.use('jwt').generate(refreshToken.user)
        return response.ok({ ...tokens, user: refreshToken.user })
      }
    }

    return response.badRequest({
      message: 'Token is either invalid or expired.',
    })
  }
}
