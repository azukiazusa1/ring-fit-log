import { convert } from '~/api/models/Timeline'

const record: any = {
  totalDocs: 13,
  limit: 10,
  page: 1,
  nextPage: 2,
  prevPage: null,
  hasNextPage: true,
  hasPrevPage: false,
  totalPages: 2,
  pagingCounter: 1,
  docs: [
    {
      record: {
        comment: 'ワイドスクワット3000回達成！',
        totalDistanceRun: 0.39,
        totalCaloriesBurned: 130.32,
        totalTimeExercising: 1963000,
        stamps: {
          arms: false,
          stomach: false,
          legs: false,
          yoga: false
        }
      },
      user: {
        _id: 'f24196497a4c3076ab1e757',
        username: 'user1',
        photoURL: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
      },
      _id: '60ea4f18005d0c7f927d953c',
      createdAt: '2021-07-06T14:48:21.068Z',
      updatedAt: '2021-07-06T14:50:32.727Z',
      likes: [
        '5f24196497a4c3076ab1e757',
        '5f24196497a4c3076ab1e758',
        '5f24196497a4c3076ab1e759'
      ]
    }
  ]
}

describe('~/api/models/Timeline', () => {
  describe('convert', () => {
    test('userの_idは削除される', () => {
      const result = convert(record, '5f24196497a4c3076ab1e757')
      expect('_id' in result.docs[0].user).toBeFalsy()
    })

    test('likesのlengthがlikeCountの値になる', () => {
      const result = convert(record, '5f24196497a4c3076ab1e757')
      expect(result.docs[0].likeCount).toEqual(3)
    })

    test('userIdと、レコードのuserの_idが一致するときmeはtrue', () => {
      const result = convert(record, 'f24196497a4c3076ab1e757')
      expect(result.docs[0].me).toBeTruthy()
    })

    test('userIdと、レコードのuserの_idが一致するときmeはtrue', () => {
      const result = convert(record, '5f24196497a4c3076ab1e757')
      expect(result.docs[0].me).toBeFalsy()
    })

    test('userIdがレコードのlikesに含まれているとき、isLikedはtrue', () => {
      const result = convert(record, '5f24196497a4c3076ab1e757')
      expect(result.docs[0].isLiked).toBeTruthy()
    })

    test('userIdがレコードのlikesに含まれていないとき、isLikedはfalse', () => {
      const result = convert(record, 'f24196497a4c3076ab1e757')
      expect(result.docs[0].isLiked).toBeFalsy()
    })
  })
})
