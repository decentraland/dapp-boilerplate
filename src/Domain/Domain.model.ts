import { Model } from 'decentraland-server'

export interface DomainAttributes {
  id: number
  param: string
  created_at?: Date
  updated_at?: Date
}

export class Domain extends Model {
  static tableName = 'domains'
  static columnNames = ['id', 'param', 'created_at', 'updated_at']

  static findByParam(param): Promise<DomainAttributes> {
    return this.findOne({ param })
  }
}
