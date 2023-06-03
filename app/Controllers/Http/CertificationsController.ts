import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
import Course from 'App/Models/Course'
import Certificate from 'App/Models/Certificate'

export default class CertificationsController {
  public async index({ view, auth, response }: HttpContextContract) {
    const user = await auth.authenticate()
    const certificates = await Certificate.query().where('user_id', user.id).preload('course')
    return view.render('client/certifications', {
      certificates,
      certificatesJSON: JSON.stringify(certificates),
    })
  }

  public async show({ view, auth, request, response }: HttpContextContract) {
    const user = await auth.authenticate()
    const courseId = request.param('courseId')
    const certificate = await Certificate.query()
      .where('course_id', courseId)
      .where('user_id', user.id)
      .preload('course')
      .first()
    if (!certificate) return response.redirect('/')
    return view.render('client/certificate', { certificate, user })
  }
}
