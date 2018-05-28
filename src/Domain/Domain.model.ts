import { Model } from 'decentraland-server'

export interface DomainAttributes {
  id?: string
  param: string
}

export class Domain extends Model {
  static tableName = 'domains'
  static columnNames = ['id', 'param']

  static findByParam(param): Promise<DomainAttributes> {
    return this.findOne({ param })
  }
}
