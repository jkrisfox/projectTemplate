import DefaultController from "./default.controller";

import { Request, Response, Router } from "express";

import { getRepository } from "typeorm";
import { User } from "../entity";

export class UserController extends DefaultController {
  protected initializeRoutes(): Router {
    const router = Router();
    router
      .route("/users")
      .get((req: Request, res: Response) => {
        const userRepo = getRepository(User);
        userRepo.find().then((users: User[]) => {
          res.status(200).send({ users });
        });
      })
      .post((req: Request, res: Response) => {
        const userRepo = getRepository(User);
        const { firstName, lastName, emailAddress, password } = req.body;
        const user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.emailAddress = emailAddress;
        user.password = password;
        userRepo.save(user).then(
          (updatedUser) => {
            res.status(200).send({ user });
          },
          (reason: any) => {
            res.status(500).send({ reason });
          },
        );
      });
    return router;
  }
}

export default UserController;
