import { Domain } from '../src/Domain'

const tableName = Domain.tableName

exports.up = pgm => {
  pgm.createTable(
    tableName,
    {
      id: { type: 'INT', primaryKey: true, notNull: true },
      param: { type: 'TEXT' },
      created_at: { type: 'TIMESTAMP', notNull: true },
      updated_at: { type: 'TIMESTAMP' }
    },
    { ifNotExists: true }
  )

  pgm.createIndex(tableName, 'param')
}

exports.down = pgm => {
  pgm.dropIndex(tableName, 'param')
  pgm.dropTable(tableName)
}
