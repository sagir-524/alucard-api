import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ResendVerificationEmailRequestValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({ trim: true }, [rules.required(), rules.email()]),
  })

  public messages: CustomMessages = {}

  public cacheKey = 'validation-schema:auth.resend-verification-email'
}
