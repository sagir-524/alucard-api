import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import { type Optional } from '../utils/utility_types.js'
import Role from './role.js'
import { type ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Permission extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare key: string

  @column()
  declare description: Optional<string>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime()
  declare archivedAt: Optional<DateTime>

  @manyToMany(() => Role, { pivotTable: 'permission_role_pivots' })
  declare roles: ManyToMany<typeof Role>
}
