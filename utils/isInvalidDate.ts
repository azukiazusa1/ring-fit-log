export default function(value: string | Date): boolean {
  const date = new Date(value)
  return date.toString() === 'Invalid Date'
}
