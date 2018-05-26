import { AnyAction } from 'redux'

// TODO: Type state here
export const isLoading: (state: any) => boolean = state => state.length > 0

export const isLoadingType: (state: any, type: string) => boolean = (
  state,
  type
) => state.some((action: AnyAction) => action.type === type)
