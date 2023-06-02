import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'certificates'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').references('id').inTable('users').onDelete('CASCADE')
      table.integer('course_id').references('id').inTable('courses').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now(6))
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now(6))
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
