import { action } from 'typesafe-actions'
import {
  FETCH_DOMAINS_FAILURE,
  FETCH_DOMAINS_REQUEST,
  FETCH_DOMAINS_SUCCESS,
  Domain
} from 'modules/domain/types'

export const fetchDomainsRequest = (param: string) =>
  action(FETCH_DOMAINS_REQUEST, { param })

export const fetchDomainsSuccess = (domains: Domain[]) =>
  action(FETCH_DOMAINS_SUCCESS, { domains })

export const fetchDomainsFailure = (error: string) =>
  action(FETCH_DOMAINS_FAILURE, { error })
