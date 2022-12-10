import Mail from '@ioc:Adonis/Addons/Mail'
import Redis from '@ioc:Adonis/Addons/Redis'
import { cuid } from '@ioc:Adonis/Core/Helpers'
import User from 'App/Models/User'

export class UserService {
  private static getUserVerificationKey(userId: number): string {
    return `email-verification:user:${userId}`
  }

  public static generateVerificationUri(): string {
    return cuid()
  }

  public static generateVerificationCode(): string {
    const min = 1
    const max = 999999
    const random = Math.floor(Math.random() * (max - min)) + min
    return random.toString().padStart(6, '0')
  }

  public static async sendUserVerificationEmail(user: User): Promise<void> {
    const verificationCode = this.generateVerificationCode()
    const verificationUri = this.generateVerificationUri()

    await Redis.set(
      this.getUserVerificationKey(user.id),
      JSON.stringify({ verificationCode, verificationUri }),
      'EX',
      60 * 24 // expiring after 1 hour
    )

    return Mail.sendLater((message) => {
      message
        .subject('Alucard account email verification')
        .to(user.email)
        .from('sagir.hossain.524@gmail.com').html(`
          <p>Your verification code is <strong>${verificationCode}</strong></p>
          <a href="#">Click here to verify</a>
        `)
    })
  }

  public static async verifyUser(
    user: User,
    verificationUri?: string,
    verificationCode?: string
  ): Promise<boolean> {
    const res = await Redis.get(this.getUserVerificationKey(user.id))

    if (res) {
      const data = JSON.parse(res)
      if (data.verificationUri === verificationUri || data.verificationCode === verificationCode) {
        user.verified = true
        await user.save()
        return true
      }
    }

    return false
  }

  public static getUserByEmailOrFail(email: string, verified = true): Promise<User> {
    return User.query()
      .withScopes((query) => (verified ? query.verified() : query.pending()))
      .where('email', email)
      .firstOrFail()
  }
}
