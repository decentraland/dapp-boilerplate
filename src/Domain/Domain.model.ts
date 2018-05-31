import { Model, SQL } from 'decentraland-server'
import { DomainAttributes } from './Domain.types'

export class Domain extends Model<DomainAttributes> {
  static tableName = 'domains'

  static findByParam(param) {
    return this.findOne<DomainAttributes>({ param })
  }

  static findByComplexQuery(param: string) {
    return this.query<DomainAttributes>(SQL`
      SELECT *
        FROM ${SQL.raw(this.tableName)}
        WHERE param = ${param}`)
  }
}
