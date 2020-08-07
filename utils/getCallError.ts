import Boom from '@hapi/boom'

export default (next: jest.Mock) => {
  return Boom.boomify(next.mock.calls[0][0])
}
