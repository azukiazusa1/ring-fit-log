import Record from '~/api/models/Record'

const records: any[] = [
  {
    totalCaloriesBurned: 100,
    totalDistanceRun: 1,
    totalTimeExercising: 1800000,
    comment: '',
    stamps: {
      arms: true,
      legs: true,
      stomach: true,
      yoga: false
    },
    date: new Date('2020-07-31'),
    userId: 'user2'
  },
  {
    totalCaloriesBurned: 100,
    totalDistanceRun: 1,
    totalTimeExercising: 1800000,
    comment: '',
    stamps: {
      arms: true,
      legs: true,
      stomach: true,
      yoga: false
    },
    date: new Date('2020-07-31'),
    userId: '5f24196497a4c3076ab1e757'
  },
  {
    totalCaloriesBurned: 100,
    totalDistanceRun: 1,
    totalTimeExercising: 1800000,
    comment: '',
    stamps: {
      arms: true,
      legs: true,
      stomach: true,
      yoga: false
    },
    date: new Date('2020-08-01'),
    userId: '5f24196497a4c3076ab1e757'
  },
  {
    totalCaloriesBurned: 100,
    totalDistanceRun: 1,
    totalTimeExercising: 1800000,
    comment: '',
    stamps: {
      arms: true,
      legs: true,
      stomach: true,
      yoga: false
    },
    date: new Date('2020-08-15'),
    userId: '5f24196497a4c3076ab1e757'
  },
  {
    totalCaloriesBurned: 100,
    totalDistanceRun: 1,
    totalTimeExercising: 1800000,
    comment: '',
    stamps: {
      arms: true,
      legs: true,
      stomach: true,
      yoga: false
    },
    date: new Date('2020-08-16'),
    userId: 'user2'
  },
  {
    totalCaloriesBurned: 100,
    totalDistanceRun: 1,
    totalTimeExercising: 1800000,
    comment: '',
    stamps: {
      arms: true,
      legs: true,
      stomach: true,
      yoga: false
    },
    date: new Date('2020-08-31'),
    userId: '5f24196497a4c3076ab1e757'
  },
  {
    totalCaloriesBurned: 100,
    totalDistanceRun: 1,
    totalTimeExercising: 1800000,
    comment: '',
    stamps: {
      arms: true,
      legs: true,
      stomach: true,
      yoga: false
    },
    date: new Date('2020-09-01'),
    userId: '5f24196497a4c3076ab1e757'
  }
]

export default async () => {
  await Record.deleteMany({})
  await Record.collection.insertMany(records)
  return records
}
