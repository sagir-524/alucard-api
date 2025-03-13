import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.post('me', '#controllers/me_controller.me').as('me')
    router.post('me/permissions', '#controllers/me_controller.permissions').as('me.permissions')
    router.post('me/roles', '#controllers/me_controller.roles').as('me.roles')
  })
  .prefix('api/v1')
  .as('api.v1')
  .use(middleware.auth())
