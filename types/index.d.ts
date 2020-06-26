export interface Greeting {
  greeting: string
}

export type Types = 'info' | 'error' | 'worning' | 'success'

export interface SnackbarPayload {
  message: string
  escape?: boolean
  top?: boolean
  right?: boolean
  left?: boolean
  bottom?: boolean
  timeout?: number
}

export interface SnacbarTypePayload extends SnackbarPayload {
  type: Types
}
