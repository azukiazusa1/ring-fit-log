import moment from 'moment'
import { cloneDeep } from 'lodash'

export default function<T extends { date?: Date | string }>(obj: T) {
  if (!obj.date) return

  const copyObj = cloneDeep(obj)
  copyObj.date = moment(copyObj.date).format()
  return copyObj
}
