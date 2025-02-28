import vine from '@vinejs/vine'

export const permissionListRequestValidator = vine.compile(
  vine.object({
    search: vine.string().trim().optional(),
    page: vine.number().positive().min(1).optional(),
    perPage: vine.number().positive().min(1).max(100).optional(),
    status: vine.enum(['archived', 'active', 'all']).optional(),
  })
)
