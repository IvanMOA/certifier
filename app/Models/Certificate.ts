import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import { belongsTo } from '@adonisjs/lucid/build/src/Orm/Decorators'
import User from 'App/Models/User'
import Course from 'App/Models/Course'

export default class Certificate extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public userId: string
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
  @column()
  public courseId: string
  @belongsTo(() => Course)
  public course: BelongsTo<typeof Course>
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
