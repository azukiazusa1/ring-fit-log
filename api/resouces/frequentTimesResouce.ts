import { round } from 'lodash'
import { FrequentTimeDoc } from '../models/Record'

export default (frequentTimes: FrequentTimeDoc[], total: number) => {
  const result = []
  for (let hour = 0; hour < 24; hour++) {
    const frequentTime = frequentTimes.find((v) => v._id.hour === hour)
    const percentage = frequentTime
      ? round(frequentTime.count / total, 2) * 100
      : 0

    result.push({
      hour,
      percentage
    })
  }

  return result
}
