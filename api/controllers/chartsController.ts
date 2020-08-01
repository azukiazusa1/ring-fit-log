import Express from 'express'
import Chart from '../models/Chart'

export default {
  week: (_req: Express.Request, res: Express.Response) => {
    res.status(200).json(Chart.month)
  },
  quarter: (_req: Express.Request, res: Express.Response) => {
    res.json(Chart.quarter)
  }
}
