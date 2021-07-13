import { Record } from './record'
import { LoginUser } from './auth'

export type TimelineUser = Pick<LoginUser, 'username' | 'photoURL'>

export type TimelineRecord = Pick<
  Record,
  | 'stamps'
  | 'comment'
  | 'totalDistanceRun'
  | 'totalCaloriesBurned'
  | 'totalTimeExercising'
>

export interface Timeline {
  _id: string
  record: TimelineRecord
  user: TimelineUser
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
