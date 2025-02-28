import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import { hasPermissions } from '../utils/permission_utils.js'

export default class PermissionPolicy extends BasePolicy {
  view(user: User | null): AuthorizerResponse {
    if (user) {
      return hasPermissions(user, 'permissions.view')
    }

    return false
  }

  archive(user: User | null): AuthorizerResponse {
    if (user) {
      return hasPermissions(user, 'permissions.archive')
    }

    return false
  }

  restore(user: User | null): AuthorizerResponse {
    if (user) {
      return hasPermissions(user, 'permissions.restore')
    }

    return false
  }
}
