import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'permission_role_pivots'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('permission_id').unsigned().references('permissions.id').onDelete('CASCADE')
      table.integer('role_id').unsigned().references('roles.id').onDelete('CASCADE')
      table.primary(['permission_id', 'role_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
