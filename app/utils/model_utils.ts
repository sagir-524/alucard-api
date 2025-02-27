import { scope } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export const archivedScope = scope((query) => {
  query.where((q) => {
    q.whereNotNull('archivedAt').andWhere('archivedAt', '>=', DateTime.now().toSQL())
  })
})

export const activeScope = scope((query) => {
  query.where((q) => {
    q.whereNull('archivedAt').orWhere('archivedAt', '<', DateTime.now().toSQL())
  })
})
