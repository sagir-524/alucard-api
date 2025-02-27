import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'permissions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name', 100)
      table.string('key', 50).unique()
      table.text('description').nullable()
      table.timestamp('created_at', { useTz: true, precision: 3 })
      table.timestamp('updated_at', { useTz: true, precision: 3 })
      table.timestamp('archived_at', { useTz: true, precision: 3 }).nullable().defaultTo(null)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
