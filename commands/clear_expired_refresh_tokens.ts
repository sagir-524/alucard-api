import RefreshToken from '#models/refresh_token'
import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import db from '@adonisjs/lucid/services/db'

export default class ClearExpiredRefreshTokens extends BaseCommand {
  static commandName = 'clear:expired-refresh-tokens'
  static description = ''

  static options: CommandOptions = {}

  async run() {
    this.logger.info('Clearing expired refresh tokens')

    const trx = await db.beginGlobalTransaction()
    try {
      await RefreshToken.query({ client: trx })
        .withScopes((scopes) => scopes.expired())
        .delete()
      await trx.commit()
      this.logger.info('Expired refresh tokens cleared')
    } catch {
      await trx.rollback()
      this.logger.info('Failed to clear expired refresh tokens')
    }
  }
}
