import Boom from '@hapi/boom'

export default (next: jest.Mock) => {
  return Boom.boomify(next.mock.calls[next.mock.calls.length - 1][0])
}
