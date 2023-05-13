import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import UserFactory from 'Database/factories/UserFactory'
import CourseFactory from 'Database/factories/CourseFactory'

export default class extends BaseSeeder {
  public async run() {
    await UserFactory.merge({
      role: 'admin',
      email: 'admin@admin.com',
      password: 'asdasd',
    }).create()
    const user = await UserFactory.merge({
      role: 'user',
      email: 'user@user.com',
      password: 'asdasd',
    }).create()
    const excelCourse = await CourseFactory.merge({
      name: 'Excel',
    }).create()
    await user.related('certificates').attach([excelCourse.id])
  }
}
