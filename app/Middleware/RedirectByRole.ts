import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RedirectByRole {
  public async handle({ response, request, auth }: HttpContextContract, next: () => Promise<void>) {
    console.log(request.url())
    if (request.url().includes('admin') && auth.user?.role !== 'admin')
      return response.redirect('/')
    else if (!request.url().includes('admin') && auth.user?.role === 'admin')
      return response.redirect('/admin/courses')
    await next()
  }
}
