import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import { type Optional } from '../utils/utility_types.js'
import Permission from './permission.js'
import { type ManyToMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import { activeScope, archivedScope } from '../utils/model_utils.js'

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description: Optional<string>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime()
  declare archivedAt: Optional<DateTime>

  @manyToMany(() => Permission, { pivotTable: 'permission_role_pivots' })
  declare permissions: ManyToMany<typeof Permission>

  @manyToMany(() => User, { pivotTable: 'role_user_pivots' })
  declare users: ManyToMany<typeof User>

  static archived = archivedScope
  static active = activeScope
}
