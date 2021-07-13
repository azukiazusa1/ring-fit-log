import recordSeed from './record'

export default async () => {
  const records = await recordSeed()

  return {
    records
  }
}
