/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/admin/users', 'AdminUsersController.index').middleware(['auth', 'redirectByRole'])
Route.get('/admin/users/create', 'AdminUsersController.create').middleware([
  'auth',
  'redirectByRole',
])

Route.post('/users', 'AdminUsersController.store')
Route.delete('/users/:id', 'AdminUsersController.destroy')

Route.get('/admin/courses', 'AdminCoursesController.index').middleware(['auth', 'redirectByRole'])
Route.get('/admin/courses/create', 'AdminCoursesController.create').middleware([
  'auth',
  'redirectByRole',
])
Route.get(
  '/admin/courses/:courseId/certified-users',
  'AdminCertifiedUsersController.index'
).middleware(['auth', 'redirectByRole'])

Route.post('/courses', 'AdminCoursesController.store')
Route.delete('/courses/:id', 'AdminCoursesController.destroy')
Route.delete('/courses/:courseId/certified-users/:userId', 'AdminCertifiedUsersController.destroy')
Route.post('/courses/:courseId/certified-users', 'AdminCertifiedUsersController.store')

Route.get('/admin/login', 'AdminAuthController.index')
Route.post('/admin/login', 'AdminAuthController.login')
Route.post('/admin/logout', 'AdminAuthController.logout')

Route.get('/', 'CertificationsController.index').middleware(['auth', 'redirectByRole'])
Route.get('/certificates/:courseId', 'CertificationsController.show').middleware([
  'auth',
  'redirectByRole',
])

Route.get('/login', 'AuthController.index')
Route.post('/login', 'AuthController.login')
Route.post('/logout', 'AuthController.logout')
