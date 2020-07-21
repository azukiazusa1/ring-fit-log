import moment from 'moment'

export function ms2stringTime(unixTime: number | string | null): string {
  if (!unixTime) return ''
  if (typeof unixTime === 'string') {
    unixTime = parseInt(unixTime)
  }

  return moment(unixTime)
    .utc()
    .format('HH:mm:ss')
}

export function stringTime2ms(time: string): number {
  return new Date(`1970-01-01T${time}+0000`).getTime()
}
