import moment from 'moment'

export function ms2stringTime(unixTime: number | string | null): string {
  if (typeof unixTime === 'string') {
    unixTime = parseInt(unixTime)
  }
  if (!unixTime) return ''

  return moment(unixTime)
    .utc()
    .format('HH:mm:ss')
}

export function stringTime2ms(time: string): number | null {
  const d = new Date(`1970-01-01T${time}+00:00`)
  if (d.toString() === 'Invalid Date') return null
  return d.getTime()
}
