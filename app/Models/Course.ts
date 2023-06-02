import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import Certificate from 'App/Models/Certificate'

export default class Course extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public name: string
  @column()
  public duration: number
  @manyToMany(() => User, {
    pivotTable: 'certificates',
  })
  public certifiedUsers: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
