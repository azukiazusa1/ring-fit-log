import { Error } from 'mongoose'
import Record, { RecordDoc } from '~/api/models/Record'
import seed from '~/test/api/seed/record'
import { IRecord } from '~/types/record'
import { connect, disConnect } from '~/api/db'

const { ValidationError } = Error

describe('~/api/models/Record', () => {
  beforeAll(async () => {
    await connect()
  })

  let records: RecordDoc[]
  beforeEach(async () => {
    records = await seed()
  })

  describe('Query Helper & Statics', () => {
    const userId = 'user1'

    describe('findByDate', () => {
      test('日付とuserIdからレコード1件を見つける', async () => {
        const date = new Date('2020-07-31')
        const result = await Record.findOne().findByDate(date, userId)
        expect(result?._id).toEqual(records[1]._id)
      })

      test('日付のレコードが存在しない場合、nullを返す', async () => {
        const date = new Date('2020-06-01')
        const result = await Record.findOne().findByDate(date, userId)
        expect(result).toBeNull()
      })

      test('日付のレコードは存在するが、userIdが異なる場合nullを返す', async () => {
        const date = new Date('2020-07-31')
        const result = await Record.findOne().findByDate(date, 'user3')
        expect(result).toBeNull()
      })
    })

    describe('findByMonth', () => {
      test('userIdが一致し、渡した日付の月のレコードをすべて返す', async () => {
        const date = new Date('2020-08-01')
        const result = await Record.find().findByMonth(date, userId)
        expect(result.length).toEqual(3)
      })

      test('月のレコードが存在しない場合、空の配列を返す', async () => {
        const date = new Date('2020-06-01')
        const result = await Record.find().findByMonth(date, userId)
        expect(result.length).toEqual(0)
      })

      test('月のレコードは存在するが、userIdが異なる場合空の配列を返す', async () => {
        const date = new Date('2020-08-01')
        const result = await Record.find().findByMonth(date, 'user3')
        expect(result.length).toEqual(0)
      })
    })

    describe('updateById', () => {
      test('更新されたレコードが返り値となる', async () => {
        const newReocrd: IRecord = {
          totalDistanceRun: 20,
          totalCaloriesBurned: 2,
          totalTimeExercising: 3600000,
          comment: '',
          stamps: {
            arms: false,
            legs: false,
            stomach: false,
            yoga: true
          },
          userId: 'user1',
          date: new Date('2020-07-31')
        }

        const result = await Record.updateById(records[1]._id, newReocrd)
        expect(result.totalDistanceRun).toEqual(newReocrd.totalDistanceRun)
      })

      test('update時にバリデーションが機能する', async () => {
        const newReocrd: IRecord = {
          totalDistanceRun: 999,
          totalCaloriesBurned: 2,
          totalTimeExercising: 3600000,
          comment: '',
          stamps: {
            arms: false,
            legs: false,
            stomach: false,
            yoga: true
          },
          userId: 'user1',
          date: new Date('2020-07-31')
        }

        await expect(
          Record.updateById(records[1]._id, newReocrd)
        ).rejects.toThrow(ValidationError)
      })
    })

    describe('バリデーション', () => {
      describe('totalDistanceRun', () => {
        describe('最小値は0', () => {
          test('0はOK', async () => {
            const record: IRecord = {
              totalDistanceRun: 0,
              totalCaloriesBurned: 1,
              totalTimeExercising: 1800000,
              comment: '',
              stamps: {
                arms: false,
                legs: false,
                stomach: false,
                yoga: true
              },
              userId: 'user1',
              date: new Date('2020-10-31')
            }
            await expect(Record.create(record)).resolves.toBeDefined()
          })

          test('-1はバリデーションエラー', async () => {
            const record: IRecord = {
              totalDistanceRun: -1,
              totalCaloriesBurned: 1,
              totalTimeExercising: 1800000,
              comment: '',
              stamps: {
                arms: false,
                legs: false,
                stomach: false,
                yoga: true
              },
              userId: 'user1',
              date: new Date('2020-10-31')
            }
            await expect(Record.create(record)).rejects.toThrow(ValidationError)
          })
        })

        describe('必須項目ではない', () => {
          test('nullでもok', async () => {
            const record: IRecord = {
              totalDistanceRun: null,
              totalCaloriesBurned: 1,
              totalTimeExercising: 1800000,
              comment: '',
              stamps: {
                arms: false,
                legs: false,
                stomach: false,
                yoga: true
              },
              userId: 'user1',
              date: new Date('2020-10-31')
            }
            await expect(Record.create(record)).resolves.toBeDefined()
          })
        })
      })

      describe('totalCaloriesBurned', () => {
        describe('最小値は0', () => {
          test('0はok', async () => {
            const record: IRecord = {
              totalDistanceRun: 100,
              totalCaloriesBurned: 0,
              totalTimeExercising: 1800000,
              comment: '',
              stamps: {
                arms: false,
                legs: false,
                stomach: false,
                yoga: true
              },
              userId: 'user1',
              date: new Date('2020-10-31')
            }

            await expect(Record.create(record)).resolves.toBeDefined()
          })

          test('-1はバリデーションエラー', async () => {
            const record: IRecord = {
              totalDistanceRun: 100,
              totalCaloriesBurned: -1,
              totalTimeExercising: 1800000,
              comment: '',
              stamps: {
                arms: false,
                legs: false,
                stomach: false,
                yoga: true
              },
              userId: 'user1',
              date: new Date('2020-10-31')
            }

            await expect(Record.create(record)).rejects.toThrow(ValidationError)
          })
        })

        describe('最大値は999.99', () => {
          test('999.99はok', async () => {
            const record: IRecord = {
              totalDistanceRun: 100,
              totalCaloriesBurned: 999.99,
              totalTimeExercising: 1800000,
              comment: '',
              stamps: {
                arms: false,
                legs: false,
                stomach: false,
                yoga: true
              },
              userId: 'user1',
              date: new Date('2020-10-31')
            }

            await expect(Record.create(record)).resolves.toBeDefined()
          })

          test('1000はバリデーションエラー', async () => {
            const record: IRecord = {
              totalDistanceRun: 100,
              totalCaloriesBurned: 1000,
              totalTimeExercising: 1800000,
              comment: '',
              stamps: {
                arms: false,
                legs: false,
                stomach: false,
                yoga: true
              },
              userId: 'user1',
              date: new Date('2020-10-31')
            }

            await expect(Record.create(record)).rejects.toThrow(ValidationError)
          })
        })

        describe('必須項目ではない', () => {
          test('nullでもok', async () => {
            const record: IRecord = {
              totalDistanceRun: 100,
              totalCaloriesBurned: null,
              totalTimeExercising: 1800000,
              comment: '',
              stamps: {
                arms: false,
                legs: false,
                stomach: false,
                yoga: true
              },
              userId: 'user1',
              date: new Date('2020-10-31')
            }

            await expect(Record.create(record)).resolves.toBeDefined()
          })
        })
      })
    })

    describe('totalDistanceRun', () => {
      describe('最小値は0', () => {
        test('0はok', async () => {
          const record: IRecord = {
            totalDistanceRun: 0,
            totalCaloriesBurned: 20,
            totalTimeExercising: 1800000,
            comment: '',
            stamps: {
              arms: false,
              legs: false,
              stomach: false,
              yoga: true
            },
            userId: 'user1',
            date: new Date('2020-10-31')
          }

          await expect(Record.create(record)).resolves.toBeDefined()
        })

        test('-1はバリデーションエラー', async () => {
          const record: IRecord = {
            totalDistanceRun: -1,
            totalCaloriesBurned: 20,
            totalTimeExercising: 1800000,
            comment: '',
            stamps: {
              arms: false,
              legs: false,
              stomach: false,
              yoga: true
            },
            userId: 'user1',
            date: new Date('2020-10-31')
          }

          await expect(Record.create(record)).rejects.toThrow(ValidationError)
        })
      })

      describe('最大値は100', () => {
        test('100はok', async () => {
          const record: IRecord = {
            totalDistanceRun: 100,
            totalCaloriesBurned: 20,
            totalTimeExercising: 1800000,
            comment: '',
            stamps: {
              arms: false,
              legs: false,
              stomach: false,
              yoga: true
            },
            userId: 'user1',
            date: new Date('2020-10-31')
          }

          await expect(Record.create(record)).resolves.toBeDefined()
        })

        test('101はバリデーションエラー', async () => {
          const record: IRecord = {
            totalDistanceRun: 101,
            totalCaloriesBurned: 20,
            totalTimeExercising: 1800000,
            comment: '',
            stamps: {
              arms: false,
              legs: false,
              stomach: false,
              yoga: true
            },
            userId: 'user1',
            date: new Date('2020-10-31')
          }

          await expect(Record.create(record)).rejects.toThrow(ValidationError)
        })
      })

      describe('必須項目ではない', () => {
        test('nullでもok', async () => {
          const record: IRecord = {
            totalDistanceRun: null,
            totalCaloriesBurned: 20,
            totalTimeExercising: 1800000,
            comment: '',
            stamps: {
              arms: false,
              legs: false,
              stomach: false,
              yoga: true
            },
            userId: 'user1',
            date: new Date('2020-10-31')
          }

          await expect(Record.create(record)).resolves.toBeDefined()
        })
      })
    })

    describe('date', () => {
      describe('dateは日付型', () => {
        test('日付に変換できる表現は許容する', async () => {
          const record: IRecord = {
            totalDistanceRun: null,
            totalCaloriesBurned: 20,
            totalTimeExercising: 1800000,
            comment: '',
            stamps: {
              arms: false,
              legs: false,
              stomach: false,
              yoga: true
            },
            userId: 'user1',
            date: '2020-10-31'
          }

          await expect(Record.create(record)).resolves.toBeDefined()
        })

        test('日付にキャストできないときにはバリデーションエラー', async () => {
          const record: IRecord = {
            totalDistanceRun: 2,
            totalCaloriesBurned: 20,
            totalTimeExercising: 1800000,
            comment: '',
            stamps: {
              arms: false,
              legs: false,
              stomach: false,
              yoga: true
            },
            userId: 'user1',
            date: 'abcde'
          }

          await expect(Record.create(record)).rejects.toThrow(ValidationError)
        })
      })

      describe('必須項目', () => {
        test('空文字のときはバリデーションエラー', async () => {
          const record: IRecord = {
            totalDistanceRun: null,
            totalCaloriesBurned: 20,
            totalTimeExercising: 1800000,
            comment: '',
            stamps: {
              arms: false,
              legs: false,
              stomach: false,
              yoga: true
            },
            userId: 'user1',
            date: ''
          }

          await expect(Record.create(record)).rejects.toThrow(ValidationError)
        })
      })
    })

    describe('userId', () => {
      describe('必須項目', () => {
        test('空文字のときはバリデーションエラー', async () => {
          const record: IRecord = {
            totalDistanceRun: null,
            totalCaloriesBurned: 20,
            totalTimeExercising: 1800000,
            comment: '',
            stamps: {
              arms: false,
              legs: false,
              stomach: false,
              yoga: true
            },
            userId: '',
            date: new Date('2020-10-01')
          }

          await expect(Record.create(record)).rejects.toThrow(ValidationError)
        })
      })
    })

    describe('date + userId', () => {
      test('同じdateとuserIdの組み合わせはエラー', async () => {
        const record: IRecord = {
          totalCaloriesBurned: 20,
          totalDistanceRun: 2,
          totalTimeExercising: 3600000,
          comment: '',
          stamps: {
            arms: true,
            legs: true,
            stomach: true,
            yoga: false
          },
          date: new Date('2020-07-31'),
          userId: 'user1'
        }

        await expect(Record.create(record)).rejects.toThrow()
      })
    })

    describe('comment', () => {
      test('140文字まで入力できる', async () => {
        const record: IRecord = {
          totalCaloriesBurned: 20,
          totalDistanceRun: 2,
          totalTimeExercising: 3600000,
          comment: 'a'.repeat(140),
          stamps: {
            arms: true,
            legs: true,
            stomach: true,
            yoga: false
          },
          date: new Date('2021-06-01'),
          userId: 'user1'
        }

        await expect(Record.create(record)).resolves.toBeDefined()
      })

      test('141文字以上はバリデーションエラー', async () => {
        const record: IRecord = {
          totalCaloriesBurned: 20,
          totalDistanceRun: 2,
          totalTimeExercising: 3600000,
          comment: 'a'.repeat(141),
          stamps: {
            arms: true,
            legs: true,
            stomach: true,
            yoga: false
          },
          date: new Date('2021-06-01'),
          userId: 'user1'
        }

        await expect(Record.create(record)).rejects.toThrow(ValidationError)
      })
    })
  })

  afterAll(() => {
    disConnect()
  })
})
