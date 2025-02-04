import { ErrorRequestHandler } from 'express'

import { HTTPSTATUS } from '../config/http.config'

export const errorHandler: ErrorRequestHandler = (error, req, res): any => {
  console.error(`Error occured on PATH: ${req.path}`, error)

  if (error instanceof SyntaxError) {
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      message: 'Invalid JSON format, please check your request body',
    })
  }

  return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
    message: 'Internal server error',
    error: error?.message || 'Unknown error occurred',
  })
}
