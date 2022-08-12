import {Request,Response, NextFunction } from "express"

export const validate = (Schema:any) => (req:Request, res:Response, next:NextFunction) => {
  const { error, value } = Schema.validate(req.body)

  if (!error) {
      req.body = value
      next()
      return
  }

  res.status(400)
  throw new Error(error.details[0].message)
}
