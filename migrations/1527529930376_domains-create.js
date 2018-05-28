const { Domain } = require('../src/Domain')

const tableName = Domain.tableName

exports.up = pgm => {
  pgm.createTable(
    tableName,
    {
      id: { type: 'TEXT', primaryKey: true, notNull: true },
      param: { type: 'TEXT' }
    },
    { ifNotExists: true }
  )

  pgm.createIndex(tableName, 'param')
}

exports.down = pgm => {
  pgm.dropIndex(tableName, 'param')
  pgm.dropTable(tableName)
}
