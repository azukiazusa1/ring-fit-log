import { IRecord } from './record'

export interface User {
  username: string
  photoURL: string
}

export interface Timeline {
  _id: string
  record: IRecord
  user: User
  createdAt: string
  updatedAt: string
  likeCount: number
  isLiked: boolean
  me: boolean
}

export interface TimelineRequest {
  page?: number
  limit?: number
}
