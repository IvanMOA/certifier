// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AdminAuthController {
  public async index({ view, auth, response }: HttpContextContract) {
    const isLoggedIn = await auth.check()
    if (isLoggedIn) return response.redirect('/')
    else return view.render('client/login')
  }
  public async login({ auth, request, response, session }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      await auth.use('web').attempt(email, password)
      response.redirect('/')
    } catch (e) {
      console.log(e)
      session.flash('error', 'Invalid credentials')
      return response.redirect('/login')
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.logout()
    response.redirect('/login')
  }
}
