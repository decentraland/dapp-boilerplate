export interface Locations {
  [key: string]: (...args: any[]) => string
}

export const locations: Locations = {
  root: () => '/',

  domains: () => '/domains',

  domain: () => '/domains/:id',
  domainDetail: param => `/domains/${param}`
}
