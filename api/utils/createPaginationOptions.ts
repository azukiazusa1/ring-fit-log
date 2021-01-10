import { Request } from 'express'
export const createPagenationOptions = (req: Request) => {
  const page = req.query.page ? Number(req.query.page) : 1
  const limit = req.query.limit ? Number(req.query.limit) : 10
  const sort = createSortOption(req)

  return {
    page,
    limit,
    sort
  }
}

export const createSortOption = (req: Request) => {
  if (!req.query.sortBy || !Array.isArray(req.query.sortBy)) {
    return {
      date: 'desc'
    }
  }

  const order = req.query.sortDesc ? 'desc' : 'asc'
  const field = req.query.sortBy[0] as string

  return {
    [field]: order
  }
}
