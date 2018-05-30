import * as chai from 'chai'
import { env } from 'decentraland-commons'
import { omitProps } from './utils'

const Assertion = (chai as any).Assertion // necessary because @types/chai doesn't export chai.Assertion yet

chai.use(require('chai-as-promised'))

env.load({ path: './specs/.env' })

Assertion.addChainableMethod('equalRow', function(expectedRow: any) {
  const omittedProps = ['created_at', 'updated_at']

  if (!expectedRow.id) {
    omittedProps.push('id')
  }
  const actualRow = omitProps(this._obj, omittedProps)

  return new Assertion(expectedRow).to.deep.equal(actualRow)
})

Assertion.addChainableMethod('equalRows', function(expectedRows: any[]) {
  const omittedProps = ['created_at', 'updated_at']

  if (expectedRows.every(row => !row.id)) {
    omittedProps.push('id')
  }

  const actualRows = this._obj.map(_obj => omitProps(_obj, omittedProps))

  return new Assertion(expectedRows).to.deep.equal(actualRows)
})
