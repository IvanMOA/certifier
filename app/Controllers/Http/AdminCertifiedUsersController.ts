import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
import Course from 'App/Models/Course'

export default class AdminCoursesController {
  public async index({ view, request }: HttpContextContract) {
    const pageFromQs = request.qs()?.page
    const page = pageFromQs ? parseInt(pageFromQs, 10) : 1
    const courseId = request.param('courseId')
    const course = await Course.query().where('id', courseId).first()
    const users = await User.query()
      .whereHas('certificates', (q) => {
        q.where('course_id', courseId)
      })
      .paginate(page, 10)
    return view.render('admin/course-certified-users.edge', {
      course,
      users,
    })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('admin/courses/create-course')
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate({
      schema: schema.create({
        email: schema.string([rules.email(), rules.exists({ table: 'users', column: 'email' })]),
      }),
    })
    const courseId = request.param('courseId')
    const course = await Course.findOrFail(courseId)
    const user = await User.findByOrFail('email', payload.email)
    await course.related('certifiedUsers').attach([user.id])
    return response.redirect(`/admin/courses/${course.id}/certified-users`)
  }

  public async destroy({ request, response }: HttpContextContract) {
    const course = await Course.findOrFail(request.param('courseId'))
    await course.related('certifiedUsers').detach([request.param('userId')])
    return response.redirect(`/admin/courses/${course.id}/certified-users`)
  }
}
