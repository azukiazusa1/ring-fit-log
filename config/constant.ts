import { Week } from '~/types/setting'
import { week1, month1, month3, year1 } from '~/types/chart'

export const DARK = 'dark'
export const LIGHT = 'light'
export const THEME_COOKIE_KEY = 'theme-mode'
export const PRECISION = 2
export const SUNDAY: Week = 0
export const MONDAY: Week = 1
export const TUESDAY: Week = 2
export const WEDNESDAY: Week = 3
export const THURSDAY: Week = 4
export const FRIDAY: Week = 5
export const SATURDAY: Week = 6
export const JAPANESE_DAYS = ['日', '月', '火', '水', '木', '金', '土'] as const
export const WEEK1: week1 = 1
export const MONTH1: month1 = 2
export const MONTH3: month3 = 3
export const YEAR1: year1 = 4
