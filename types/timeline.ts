import { IRecord } from './record'

export interface User {
  username: string
  photoURL: string
}
export interface Timeline {
  record: IRecord
  user: User
  createdAt: string
  updatedAt: string
  likeCount: number
  isLiked: boolean
  me: boolean
}
