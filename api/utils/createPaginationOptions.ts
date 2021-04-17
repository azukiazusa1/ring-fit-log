import { Request } from 'express'
export const createPagenationOptions = (req: Request) => {
  const page = req.query.page ? Number(req.query.page) : 1
  const limit = req.query.itemsPerPage ? Number(req.query.itemsPerPage) : 10
  const sort = createSortOption(req)

  return {
    page,
    limit,
    sort
  }
}

export const createSortOption = (req: Request) => {
  if (
    !req.query.sortBy ||
    !Array.isArray(req.query.sortBy) ||
    !Array.isArray(req.query.sortDesc)
  ) {
    return {
      date: 'desc'
    }
  }

  const order = req.query.sortDesc[0] === 'true' ? 'asc' : 'desc'
  const field = req.query.sortBy[0] as string
  return {
    [field]: order
  }
}
