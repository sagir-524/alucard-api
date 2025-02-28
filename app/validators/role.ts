import vine from '@vinejs/vine'

export const roleValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(100),
    description: vine.string().trim().optional(),
    permissions: vine.array(vine.number().positive().min(1)).notEmpty().distinct(),
  })
)
