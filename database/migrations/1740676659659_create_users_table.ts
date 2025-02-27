import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('first_name', 100)
      table.string('last_name', 100)
      table.string('email', 320).unique()
      table.string('password', 255)
      table.boolean('is_admin').defaultTo(false)
      table.boolean('is_super_admin').defaultTo(false)
      table.timestamp('created_at', { useTz: true, precision: 3 })
      table.timestamp('updated_at', { useTz: true, precision: 3 })
      table.timestamp('deactivated_at', { useTz: true, precision: 3 }).nullable().defaultTo(null)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
