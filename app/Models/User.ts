import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, ManyToMany, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import { Role } from 'App/Models/Role'
import Certificate from 'App/Models/Certificate'
import { manyToMany } from '@adonisjs/lucid/build/src/Orm/Decorators'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public name: string
  @column()
  public lastName: string
  @column()
  public age: number
  @column()
  public company: string
  @column()
  public role: Role

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  @hasMany(() => Certificate, {})
  public certificates: HasMany<typeof Certificate>

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
