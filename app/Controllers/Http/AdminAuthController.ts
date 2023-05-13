// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AdminAuthController {
  public async index({ view, auth }: HttpContextContract) {
    const isLoggedIn = await await auth.check()
    if (isLoggedIn) return view.render('admin/users')
    else return view.render('admin/login')
  }
  public async login({ auth, request, response, session }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      await auth.use('web').attempt(email, password)
      response.redirect('/admin/users')
    } catch {
      session.flash('error', 'Invalid credentials')
      return response.redirect('/admin/login')
    }
  }
  public async logout({ auth, response }: HttpContextContract) {
    await auth.logout()
    response.redirect('/admin/login')
  }
}
