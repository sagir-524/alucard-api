import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { passwordRegex, passwordValidationMessage } from 'App/utils/password'

export default class LoginRequestValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({ trim: true }, [rules.required(), rules.email()]),
    password: schema.string({ trim: true }, [
      rules.required(),
      rules.minLength(8),
      rules.maxLength(16),
      rules.regex(passwordRegex),
    ]),
  })

  public messages: CustomMessages = {
    'password.regex': passwordValidationMessage,
  }

  public cacheKey = `validation-schema:auth.login`
}
