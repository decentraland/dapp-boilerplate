import { action } from 'typesafe-actions'
import { Domain } from 'modules/domain/types'

// Fetch domains

export const FETCH_DOMAINS_REQUEST = '[Request] Fetch Domains'
export const FETCH_DOMAINS_SUCCESS = '[Success] Fetch Domains'
export const FETCH_DOMAINS_FAILURE = '[Failure] Fetch Domains'

export const fetchDomainsRequest = () => action(FETCH_DOMAINS_REQUEST)
export const fetchDomainsSuccess = (domains: Domain[]) =>
  action(FETCH_DOMAINS_SUCCESS, { domains })
export const fetchDomainsFailure = (error: string) =>
  action(FETCH_DOMAINS_FAILURE, { error })

export type FetchDomainsRequestAction = ReturnType<typeof fetchDomainsRequest>
export type FetchDomainsSuccessAction = ReturnType<typeof fetchDomainsSuccess>
export type FetchDomainsFailureAction = ReturnType<typeof fetchDomainsFailure>

// Fetch domain

export const FETCH_DOMAIN_REQUEST = '[Request] Fetch Domain'
export const FETCH_DOMAIN_SUCCESS = '[Success] Fetch Domain'
export const FETCH_DOMAIN_FAILURE = '[Failure] Fetch Domain'

export const fetchDomainRequest = (id: string) =>
  action(FETCH_DOMAIN_REQUEST, { id })
export const fetchDomainSuccess = (domain: Domain) =>
  action(FETCH_DOMAIN_SUCCESS, { domain })
export const fetchDomainFailure = (error: string) =>
  action(FETCH_DOMAIN_FAILURE, { error })

export type FetchDomainRequestAction = ReturnType<typeof fetchDomainRequest>
export type FetchDomainSuccessAction = ReturnType<typeof fetchDomainSuccess>
export type FetchDomainFailureAction = ReturnType<typeof fetchDomainFailure>
