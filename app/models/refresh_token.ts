import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, scope } from '@adonisjs/lucid/orm'
import User from './user.js'
import { type BelongsTo } from '@adonisjs/lucid/types/relations'

export default class RefreshToken extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare refreshToken: string

  @column.dateTime()
  declare expiresAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  static valid = scope((query) => {
    query.where('expiresAt', '<', DateTime.now().plus({ days: 2 }).toSQL())
  })

  static expired = scope((query) => {
    query.where('expiresAt', '>=', DateTime.now().plus({ days: 2 }).toSQL())
  })
}
