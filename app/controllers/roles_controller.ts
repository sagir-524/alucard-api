import Permission from '#models/permission'
import Role from '#models/role'
import { roleValidator } from '#validators/role'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class RolesController {
  async store({ bouncer, request, response }: HttpContext) {
    await bouncer.with('RolePolicy').authorize('create')

    const { name, description, permissions } = await request.validateUsing(roleValidator)
    const dbPermissions = await Permission.query()
      .withScopes((query) => query.active())
      .whereIn('id', permissions)
      .exec()

    if (permissions.length !== dbPermissions.length) {
      return response.badRequest({ message: 'Not all the permissions exists in the database.' })
    }

    const trx = await db.transaction()
    try {
      const role = await Role.create({ name, description }, { client: trx })
      await role.related('permissions').attach(permissions, trx)
      await trx.commit()
      response.created()
    } catch {
      await trx.rollback()
      response.badRequest()
    }
  }
}
