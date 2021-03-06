export function maxLengthError(name: string, max: number) {
  return `${name}は${max}文字以内で入力してください。`
}

/**
 * ${name}は必須項目です。
 * @param name
 * @returns
 */
export function requiredError(name: string) {
  return `${name}は必須項目です。`
}

/**
 * `${name}は数字で入力してください。`
 * @param name
 */
export function decimalError(name: string): string {
  return `${name}は数字で入力してください。`
}

/**
 * `${name}は${min}から${max}の間で入力してください。`
 * @param name
 * @param min
 * @param max
 */
export function rangeError(name: string, min: number, max: number): string {
  return `${name}は${min}から${max}の間で入力してください。`
}

/**
 * `${name}は${min}から${max}の間で入力してください。`
 * @param name
 */
export function timeError(name: string): string {
  return `${name}はHH:mm:ssの形式で入力してください。`
}
