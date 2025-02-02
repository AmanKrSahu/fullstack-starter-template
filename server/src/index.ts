import 'dotenv/config'

import cookieParser from 'cookie-parser'
import express, { NextFunction, Request, Response } from 'express'

import cors from 'cors'
import { config } from './config/app.config'
import { HTTPSTATUS } from './config/http.config'

import { errorHandler } from './middlewares/errorHandler'
import { asyncHandler } from './middlewares/asyncHandler'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(
  cors({
    origin: config.APP_ORIGIN,
    credentials: true,
  })
)

app.use(errorHandler)

app.get(
  '/',
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.status(HTTPSTATUS.OK).json({
      message: 'Server started successfully',
    })
  })
)

app.listen(config.PORT, async () => {
  console.log(`Server listening on port ${config.PORT} in ${config.NODE_ENV}.`)
})
