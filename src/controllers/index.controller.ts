import { NextFunction, Request, Response } from 'express';
import path from 'path';

class IndexController {
  public index = (req: Request, res: Response, next: NextFunction): void => {
    try {
      res.sendFile('./index.html', { root: path.join(__dirname, '../client') });
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
