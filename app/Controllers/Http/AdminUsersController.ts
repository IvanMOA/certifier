import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AdminUsersController {
  public async index({ view, request }: HttpContextContract) {
    const pageFromQs = request.qs()?.page
    const page = pageFromQs ? parseInt(pageFromQs, 10) : 1
    return view.render('admin/users', {
      users: await Database.from('users').paginate(page, 10),
    })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('admin/users/create-user')
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate({
      schema: schema.create({
        name: schema.string(),
        lastName: schema.string(),
        age: schema.number(),
        company: schema.string(),
        email: schema.string([rules.email(), rules.unique({ table: 'users', column: 'email' })]),
        password: schema.string(),
      }),
    })
    await User.create({
      ...payload,
      role: 'user',
    })
    return response.redirect('/admin/users')
  }

  public async destroy({ request, response }: HttpContextContract) {
    const user = await User.findOrFail(request.param('id'))
    await user.delete()
    return response.redirect('/admin/users')
  }
}
