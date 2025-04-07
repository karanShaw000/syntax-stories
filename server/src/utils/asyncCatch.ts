import { Request, Response, NextFunction } from "express"
const asyncCatch = (func: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {

  return (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch(next);
  }

}

export default asyncCatch
