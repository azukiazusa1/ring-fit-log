export interface Greeting {
  greeting: string
}

export interface SnackbarPayload {
  message: string
  color?: string
  escape?: boolean
  top?: boolean
  right?: boolean
  left?: boolean
  bottom?: boolean
  timeout?: number
}
