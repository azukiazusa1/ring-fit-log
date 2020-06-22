export interface Greeting {
  greeting: String
}

export interface SnackbarPayload {
  message: String
  color?: String
  escape?: Boolean
  top?: Boolean
  right?: Boolean
  left?: Boolean
  bottom?: Boolean
  timeout?: Number
}
