import DefaultController from "./default.controller";

import express, { Request, Response } from "express";
import { Connection, getConnection } from "typeorm";

import Session from "../entity/session.entity";
import User from "../entity/user.entity";

export class LoginController extends DefaultController {
  protected initializeRoutes(connection: Connection): express.Router {
    const router = express.Router();
    const userRepo = connection.getRepository(User);
    const sessionRepo = connection.getRepository(Session);
    router.route("/login").post((req: Request, res: Response) => {
      const { emailAddress, password } = req.body;
      userRepo
        .findOne({ where: { emailAddress } })
        .then((user: User | undefined) => {
          if (user && user.password === password) {
            sessionRepo
              .findOne({ where: { userId: user.id } })
              .then((session: Session | undefined) => {
                const expiry = new Date(new Date().getTime() + 60000 * 30);
                if (!session) {
                  session = new Session();
                  session.user = user;
                }
                session.expiresAt = expiry;
                sessionRepo.save(session).then((updatedSession) => {
                  res.status(200).send({ token: updatedSession.id});
                });
              });
          } else {
            res
              .status(401)
              .send({ error: "can't find user with that username or password" });
          }
        });
    });
    return router;
  }
}

export default LoginController;
