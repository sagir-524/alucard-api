import Permission from '#models/permission'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class MeController {
  me({ auth }: HttpContext) {
    return auth.use('jwt').user as User
  }

  async roles({ auth }: HttpContext) {
    const user = auth.use('jwt').user as User
    await user.load('roles')
    return user.roles
  }

  permissions({ auth }: HttpContext) {
    const user = auth.use('jwt').user as User

    // await user.load('roles', (rolesQuery) => {
    //   rolesQuery
    //     .withScopes((roleScopes) => roleScopes.active())
    //     .preload('permissions', (permissionsQuery) =>
    //       permissionsQuery.withScopes((permissionScopes) => permissionScopes.active())
    //     )
    // })

    return Permission.query()
      .whereHas('roles', (rolesQuery) => {
        rolesQuery
          .withScopes(({ active }) => active())
          .andWhereHas('users', (usersQuery) => {
            usersQuery.where('id', user.id)
          })
      })
      .exec()

    // const permissions: Permission[] = []

    // user.roles.forEach((role) => {
    //   role.permissions.forEach((permission) => {
    //     if (!permissions.includes(permission)) {
    //       permissions.push(permission)
    //     }
    //   })
    // })

    // return permissions
  }
}
