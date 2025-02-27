import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'refresh_tokens'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.text('refresh_tokens')
      table.timestamp('expires_at', { useTz: true, precision: 3 })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
