import express, { Request, Response } from "express";
import { getConnectionOptions, createConnection } from "typeorm";

import connectionConfig from "./config.json";

import { UserController, LoginController } from "./controller";

export default class Server {
  private app: Promise<express.Application>;
  constructor() {
    this.app = this.buildServer();
  }
  buildServer(): Promise<express.Application> {
    return getConnectionOptions().then(options => {
      const _options = { ...options };
      Object.assign(
        _options,
        (<any>connectionConfig)[process.env.NODE_ENV || "dev"]
      );
      return createConnection(_options).then(connection => {
        const app: express.Application = express();

        app.use("/", (req: Request, res: Response) => {
          res.send("hello");
        });

        app.use(new UserController(connection).router);
        app.use(new LoginController(connection).router);

        return app;
      });
    });
  }

  get appPromise() {
    return this.app;
  }
}
