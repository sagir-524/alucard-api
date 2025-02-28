import Permission from '#models/permission'
import { permissionListRequestValidator } from '#validators/permission'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class PermissionsController {
  async index({ bouncer, request }: HttpContext) {
    await bouncer.with('PermissionPolicy').authorize('view')
    const { search, page, perPage, status } = await request.validateUsing(
      permissionListRequestValidator
    )
    const query = Permission.query()

    if (status === 'active') {
      query.withScopes((q) => q.active())
    } else if (status === 'archived') {
      query.withScopes((q) => q.archived())
    }

    if (search) {
      query.where((q) => {
        q.whereILike('name', search).orWhereILike('description', search)
      })
    }

    return query.orderBy('name', 'asc').paginate(page || 1, perPage || 10)
  }

  async all({ bouncer }: HttpContext) {
    await bouncer.with('PermissionPolicy').authorize('view')
    return Permission.query().select('id', 'name').orderBy('name', 'asc')
  }

  async archive({ bouncer, params }: HttpContext) {
    await bouncer.with('PermissionPolicy').authorize('archive')
    const permission = await Permission.findOrFail(params.id)
    permission.archivedAt = DateTime.now()
    return permission.save()
  }

  async restore({ bouncer, params }: HttpContext) {
    await bouncer.with('PermissionPolicy').authorize('restore')
    const permission = await Permission.findOrFail(params.id)
    permission.archivedAt = null
    return permission.save()
  }
}
