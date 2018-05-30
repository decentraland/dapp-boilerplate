import { Model } from 'decentraland-server'
import { DomainAttributes } from './Domain.types'

export class Domain extends Model {
  static tableName = 'domains'
  static columnNames = ['id', 'param', 'created_at', 'updated_at']

  static findByParam(param): Promise<DomainAttributes> {
    return this.findOne({ param })
  }
}
