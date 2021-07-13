export type Item = {
  icon: string
  title: string
  to: string
  badge?: boolean
}

export type Types = 'info' | 'error' | 'warning' | 'success'

export interface SnackbarPayload {
  message: string
  escape?: boolean
  top?: boolean
  right?: boolean
  left?: boolean
  bottom?: boolean
  color?: string
  shaped?: boolean
  timeout?: number
}

export interface SnackbarTypePayload extends SnackbarPayload {
  type?: Types
}
