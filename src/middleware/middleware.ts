import { NextFunction, Request, Response } from "express";

export default class MiddleWare {
  private cache: any = {};

  // handles the passing of the API token
  public authHandler = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
      return res.status(403).send({ message: "Missing authorization credentials" });
    } else {
      next();
    }
  }

  // handles the passing of the stations IDs
  public idHandler = (req: Request, res: Response, next: NextFunction) => {
    if (!req.params.id) {
      res.status(400).send({ message: "Bad Request: Include station ID" });
    } else {
      next();
    }
  }

  // handles the passing of the date
  public dateHandler = (req: Request, res: Response, next: NextFunction) => {
    if (!req.params.date) {
      res.status(400).send({ message: "Bad Request: Include valid date Ex: YYYY-MM-DD" });
    } else {
      next();
    }
  }

  // handles the retrieval of cached data
  public cacheHandler = (req: Request, res: Response, next: NextFunction) => {
    const key = req.url;
    if (this.cache[key]) {
      // would complete caching here but I'm only familiar with third party libraries
      next();
    } else {
      next();
    }
  }
}
