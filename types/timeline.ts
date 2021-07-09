import { LoginUser } from './auth'
import { IRecord } from './record'

export interface Timeline {
  record: IRecord
  user: LoginUser
  createdAt: string
  updatedAt: string
  likeCount: number
  isLiked: boolean
}
