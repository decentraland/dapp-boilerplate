import { action } from 'typesafe-actions'
import {
  FETCH_DOMAINS_REQUEST,
  FETCH_DOMAINS_SUCCESS,
  FETCH_DOMAINS_FAILURE,
  FETCH_DOMAIN_REQUEST,
  FETCH_DOMAIN_SUCCESS,
  FETCH_DOMAIN_FAILURE,
  Domain
} from 'modules/domain/types'

export const fetchDomainsRequest = () => action(FETCH_DOMAINS_REQUEST)
export const fetchDomainsSuccess = (domains: Domain[]) =>
  action(FETCH_DOMAINS_SUCCESS, { domains })
export const fetchDomainsFailure = (error: string) =>
  action(FETCH_DOMAINS_FAILURE, { error })

export const fetchDomainRequest = (id: string) =>
  action(FETCH_DOMAIN_REQUEST, { id })
export const fetchDomainSuccess = (domain: Domain) =>
  action(FETCH_DOMAIN_SUCCESS, { domain })
export const fetchDomainFailure = (error: string) =>
  action(FETCH_DOMAIN_FAILURE, { error })
