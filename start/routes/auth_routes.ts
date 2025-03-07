import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.post('login', '#controllers/auth_controller.login').as('login')
    router.post('refresh', '#controllers/auth_controller.refresh').as('refresh')
    router.get('me', '#controllers/auth_controller.me').use(middleware.auth()).as('me')
  })
  .prefix('api/v1')
  .as('api.v1')
