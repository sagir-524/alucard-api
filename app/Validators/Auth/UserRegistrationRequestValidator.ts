import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { passwordRegex, passwordValidationMessage } from 'App/utils/password'

export default class UserRegistrationRequestValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    firstname: schema.string({ trim: true }, [
      rules.required(),
      rules.minLength(3),
      rules.maxLength(255),
    ]),
    lastname: schema.string({ trim: true }, [
      rules.required(),
      rules.minLength(3),
      rules.maxLength(255),
    ]),
    email: schema.string({ trim: true }, [
      rules.required(),
      rules.email(),
      rules.unique({
        table: 'users',
        column: 'email',
      }),
    ]),
    password: schema.string({ trim: true }, [
      rules.required(),
      rules.minLength(8),
      rules.maxLength(16),
      // at least one number, one character and one special character
      rules.regex(passwordRegex),
      rules.confirmed(),
    ]),
  })

  public messages: CustomMessages = {
    'password.regex': passwordValidationMessage,
  }

  public cacheKey = `validation-schema:auth.register`
}
