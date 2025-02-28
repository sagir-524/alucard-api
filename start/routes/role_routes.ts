import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.post('roles', '#controllers/roles_controller.create').as('store')
  })
  .prefix('api/v1')
  .as('api.v1')
  .use(middleware.auth())
