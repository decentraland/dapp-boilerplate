import { expect } from 'chai'
import { db } from '../database'
import { Domain } from './Domain.model'

describe('Domain', function() {
  describe('.findByParam', function() {
    it('should only return enabled districts', async function() {
      const paramName = 'Param Name'
      const now = new Date()

      await Promise.all([
        Domain.insert({
          id: 1,
          param: paramName,
          created_at: now,
          updated_at: now
        }),
        Domain.insert({
          id: 2,
          param: 'Disabled',
          created_at: now,
          updated_at: now
        }),
        Domain.insert({
          id: 3,
          param: 'Param 2',
          created_at: now,
          updated_at: now
        })
      ])

      const domains = await Domain.findByParam(paramName)

      expect(domains).to.be.deep.equal({
        id: 1,
        param: paramName,
        created_at: now,
        updated_at: now
      })
    })
  })

  afterEach(() => db.truncate(Domain.tableName))
})
