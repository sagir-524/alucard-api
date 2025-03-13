import vine from '@vinejs/vine'
import { allExistsRule } from '../rules/all_exists.js'
import Permission from '#models/permission'

export const roleValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(100),
    description: vine.string().trim().optional(),
    permissions: vine
      .array(vine.number().positive().min(1))
      .notEmpty()
      .distinct()
      .use(
        allExistsRule({
          model: Permission,
          column: 'id',
          queryModifier: (query) => {
            query.withScopes((scopes) => scopes.active())
          },
        })
      ),
  })
)
