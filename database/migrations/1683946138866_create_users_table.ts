import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name', 255).notNullable()
      table.string('last_name', 255).notNullable()
      table.string('age', 255).notNullable()
      table.string('company', 255).notNullable()
      table.string('email', 255).notNullable().unique()
      table.enu('role', ['admin', 'user']).notNullable()
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now(6))
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now(6))
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
