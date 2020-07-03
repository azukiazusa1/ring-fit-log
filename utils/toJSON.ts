import moment from 'moment'
import { cloneDeep } from 'lodash'

export default function<T extends { date?: Date | string }>(obj: T): T {
  const copyObj = cloneDeep(obj)
  if (!copyObj.date) return copyObj
  copyObj.date = moment(copyObj.date).format()
  return copyObj
}
