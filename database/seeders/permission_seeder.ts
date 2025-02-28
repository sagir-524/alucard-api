import Permission from '#models/permission'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  #permissions: Array<Pick<Permission, 'name' | 'key'>> = [
    {
      name: 'View Permissions',
      key: 'permissions.view',
    },
    {
      name: 'Archive Permissions',
      key: 'permissions.archive',
    },
    {
      name: 'Restore Permissions',
      key: 'permissions.restore',
    },
    {
      name: 'View Roles',
      key: 'roles.view',
    },
    {
      name: 'Create Roles',
      key: 'roles.create',
    },
    {
      name: 'Update Roles',
      key: 'roles.update',
    },
    {
      name: 'Archive Roles',
      key: 'roles.archive',
    },
    {
      name: 'Restore Roles',
      key: 'roles.restore',
    },
  ]

  async run() {
    const existingPermissions = await Permission.query().select('key')
    const missingPermissions = this.#permissions.filter((permission) => {
      return !existingPermissions.find(({ key }) => key !== permission.key)
    })
    const newlyCreatedPermissions = await Permission.createMany(missingPermissions)
    console.log(`Total ${newlyCreatedPermissions.length} new permissions created`)
  }
}
