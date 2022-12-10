import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

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
      rules.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/),
      rules.confirmed(),
    ]),
  })

  public messages: CustomMessages = {
    'password.regex':
      'Password must contain at-least one number, one character and one special character',
  }

  public cacheKey = `validation-schema:auth.register`
}
