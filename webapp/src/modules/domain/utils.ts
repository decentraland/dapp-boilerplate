import { Domain } from 'modules/domain/types'

export function toDomainObject(domains: Domain[]): { [id: string]: Domain } {
  return domains.reduce((map, domain) => {
    map[domain.id] = domain
    return map
  }, {})
}
