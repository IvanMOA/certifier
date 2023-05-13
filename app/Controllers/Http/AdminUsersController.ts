// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AdminUsersController {
  public async index({ view }: HttpContextContract) {
    return view.render('admin/users')
  }
}
