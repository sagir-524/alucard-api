import vine from '@vinejs/vine'

export const refreshValidator = vine.compile(
  vine.object({
    refreshToken: vine.string().trim(),
  })
)
