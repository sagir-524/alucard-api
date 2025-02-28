import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.get('permissions', '#controllers/permissions_controller.index').as('index')
    router.get('permissions/all', '#controllers/permissions_controller.all').as('all')

    router
      .delete('permissions/:id/archive', '#controllers/permissions_controller.archive')
      .as('archive')

    router
      .put('permissions/:id/restore', '#controllers/permissions_controller.restore')
      .as('restore')
  })
  .prefix('api/v1')
  .as('api.v1')
  .use(middleware.auth())
