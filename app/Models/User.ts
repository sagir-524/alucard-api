import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, scope } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public firstname: string

  @column()
  public lastname: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string | null = null

  @column()
  public verified: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public static verified = scope((query) => query.where('verified', true))
  public static pending = scope((query) => query.where('verified', false))

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.password && user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
