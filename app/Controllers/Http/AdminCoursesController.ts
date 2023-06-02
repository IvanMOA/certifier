import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { schema } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
import Course from 'App/Models/Course'

export default class AdminCoursesController {
  public async index({ view, request }: HttpContextContract) {
    const pageFromQs = request.qs()?.page
    const page = pageFromQs ? parseInt(pageFromQs, 10) : 1
    return view.render('admin/courses', {
      courses: await Database.from('courses').paginate(page, 10),
    })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('admin/courses/create-course')
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate({
      schema: schema.create({
        name: schema.string(),
        duration: schema.number(),
      }),
    })
    await Course.create(payload)
    return response.redirect('/admin/courses')
  }

  public async destroy({ request, response }: HttpContextContract) {
    const course = await Course.findOrFail(request.param('id'))
    await course.delete()
    return response.redirect('/admin/courses')
  }
}
