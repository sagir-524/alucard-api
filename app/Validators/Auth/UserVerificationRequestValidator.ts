import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserVerificationRequestValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({ trim: true }, [rules.required(), rules.email()]),
    verificationUri: schema.string.optional({ trim: true }, [
      rules.requiredIfNotExists('verificationCode'),
    ]),
    verificationCode: schema.string.optional({ trim: true }, [
      rules.requiredIfNotExists('verificationUri'),
    ]),
  })

  public messages: CustomMessages = {}

  public cacheKey = 'validation-schema:auth.verify'
}
