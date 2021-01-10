import { Request } from 'express'
export const createPagenationOptions = (req: Request) => {
  const page = req.params.page ? Number(req.params.page) : 1
  const limit = req.params.page ? Number(req.params.limit) : 10
  const sort = createSortOption(req)

  return {
    page,
    limit,
    sort
  }
}

export const createSortOption = (req: Request) => {
  if (!req.params.sortBy) {
    return {
      date: 'desc'
    }
  }

  const order = req.params.sortDesc ? 'desc' : 'asc'

  return {
    [req.params.sortBy]: order
  }
}
