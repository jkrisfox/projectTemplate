import { Router } from "express";
import { Connection } from "typeorm";

export default abstract class DefaultController {
  public router: Router;

  constructor(connection: Connection) {
    this.router = this.initializeRoutes(connection);

  }

  protected abstract initializeRoutes(connection: Connection): Router;

}