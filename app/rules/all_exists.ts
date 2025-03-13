import { DatabaseQueryBuilderContract } from '@adonisjs/lucid/types/querybuilder'
import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'
import { BaseModel } from '@adonisjs/lucid/orm'
import { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'

/**
 * Options accepted by the unique rule
 */
type Options<T extends typeof BaseModel> = {
  model: T
  column: string
  queryModifier?: (query: ModelQueryBuilderContract<T, InstanceType<T>>) => void
}

/**
 * Implementation
 */
async function allExists<T extends typeof BaseModel>(
  value: unknown,
  options: Options<T>,
  field: FieldContext
) {
  /**
   * We do not want to deal with non-string
   * values. The "string" rule will handle the
   * the validation.
   */
  if (!Array.isArray(value)) {
    return
  }

  if (!field.isValid) {
    return
  }

  const query = options.model.query().select(options.column).whereIn(options.column, value)
  options.queryModifier && options.queryModifier(query)
  const res = await query.exec()

  if (res.length !== value.length) {
    field.report('Not all {{ field }} field exists in the database', 'allExists', field)
  }
}

export const allExistsRule = vine.createRule(allExists, { isAsync: true })
