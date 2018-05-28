import { action } from 'typesafe-actions'
import {
  FETCH_DOMAIN_FAILURE,
  FETCH_DOMAIN_REQUEST,
  FETCH_DOMAIN_SUCCESS,
  Domain
} from 'modules/domain/types'

export const fetchDomainRequest = (id: string) =>
  action(FETCH_DOMAIN_REQUEST, { id })

export const fetchDomainSuccess = (domain: Domain) =>
  action(FETCH_DOMAIN_SUCCESS, { domain })

export const fetchDomainFailure = (error: string) =>
  action(FETCH_DOMAIN_FAILURE, { error })
