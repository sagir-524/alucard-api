import User from '#models/user'
import db from '@adonisjs/lucid/services/db'

export const hasPermissions = async (user: User, ...permissions: string[]): Promise<boolean> => {
  if (user.isSuperAdmin) {
    return true
  }

  const dbPermissions = await db
    .query()
    .from('role_user_pivots')
    .leftJoin(
      'permission_role_pivots',
      'role_user_pivots.role_id',
      '=',
      'permission_role_pivots.role_id'
    )
    .leftJoin('permissions', 'permission_role_pivots.permission_id', '=', 'permissions.id')
    .where('role_user_pivots.user_id', user.id)
    .select('permissions.key')
    .groupBy('permissions.key')
    .exec()

  return dbPermissions.length === permissions.length
}
