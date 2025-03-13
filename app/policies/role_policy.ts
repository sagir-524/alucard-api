import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import { hasPermissions } from '../utils/permission_utils.js'

export default class RolePolicy extends BasePolicy {
  create(user: User | null): AuthorizerResponse {
    if (user) {
      return hasPermissions(user, 'roles.create')
    }

    return false
  }

  update(user: User | null): AuthorizerResponse {
    if (user) {
      return hasPermissions(user, 'roles.update')
    }

    return false
  }
}
