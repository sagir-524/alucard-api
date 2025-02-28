import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column, hasMany, manyToMany, scope } from '@adonisjs/lucid/orm'
import { type Optional } from '../utils/utility_types.js'
import Role from './role.js'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import hash from '@adonisjs/core/services/hash'
import RefreshToken from './refresh_token.js'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare isAdmin: boolean

  @column()
  declare isSuperAdmin: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime()
  declare emailVerifiedAt: Optional<DateTime>

  @column.dateTime()
  declare deactivatedAt: Optional<DateTime>

  @manyToMany(() => Role, { pivotTable: 'role_user_pivots' })
  declare roles: ManyToMany<typeof Role>

  @hasMany(() => RefreshToken)
  declare refreshTokens: HasMany<typeof RefreshToken>

  static verified = scope((query) => query.whereNotNull('emailverifiedAt'))
  static unverified = scope((query) => query.whereNull('emailVerifiedAt'))

  @beforeSave()
  static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await hash.make(user.password)
    }
  }
}
