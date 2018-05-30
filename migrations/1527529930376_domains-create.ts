import { MigrationBuilder } from 'node-pg-migrate'
import { Domain } from '../src/Domain'

const tableName = Domain.tableName

exports.up = (pgm: MigrationBuilder) => {
  pgm.createTable(
    tableName,
    {
      id: { type: 'INT', primaryKey: true, notNull: true, comment: null },
      param: { type: 'TEXT', comment: null },
      created_at: { type: 'TIMESTAMP', notNull: true, comment: null },
      updated_at: { type: 'TIMESTAMP', comment: null }
    },
    { ifNotExists: true, comment: null }
  )

  pgm.createIndex(tableName, 'param')
}

exports.down = (pgm: MigrationBuilder) => {
  pgm.dropIndex(tableName, 'param')
  pgm.dropTable(tableName, {})
}
