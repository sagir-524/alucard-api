import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('register', 'AuthController.register').as('register')
  Route.post('verify', 'AuthController.verify').as('verify')
})
  .prefix('api/v1/auth')
  .as('api.v1.auth')
