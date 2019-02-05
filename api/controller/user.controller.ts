import DefaultController from "./default.controller";

import { NextFunction, Request, Response, Router } from "express";
import multer from "multer";
import Path from "path";

import { getRepository } from "typeorm";
import { Session, User } from "../entity";

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
          (createdUser) => {
            res.status(200).send({ createdUser });
          },
          (reason: any) => {
            res.status(500).send({ reason: "The email was not unique" });
          }
        );
      });
    router.route("/users/:id/profile_photo").post(
      this.isAuthenticated(true),
      multer({
        dest: Path.join(__dirname, "..", "public", "profilePhotos")
      }).single(),
      (req: Request, res: Response) => {
        const userRepo = getRepository(User);
        userRepo.findOne(req.params.id).then((user: User | undefined) => {
          if (user) {
            user.profileUrl = Path.join(req.file.path, req.file.filename);
            userRepo.save(user).then((savedUser: User) => {
              res.send({ savedUser });
            });
          }
        });
      }
    );
    router.route("/users/:id").get((req: Request, res: Response) => {
      const userRepo = getRepository(User);
      userRepo.findOne(req.params.id).then(
        (user: User | undefined) => {
          if (user) {
            res.send({ user });
          } else {
            res.status(404);
          }
        },
        () => {
          res.status(404);
        }
      );
    });
    return router;
  }

  protected isAuthenticated(checkSameUser: boolean = false) {
    return (req: Request, res: Response, next: NextFunction) => {
      const token: string | undefined = req.get("token");
      if (token) {
        const sessionRepo = getRepository(Session);
        sessionRepo.findOne(token).then((foundSession: Session | undefined) => {
          if (
            foundSession &&
            ((checkSameUser && foundSession.user.id === req.params.id) ||
              !checkSameUser) &&
            foundSession.expiresAt.getTime() > new Date().getTime()
          ) {
            next();
          } else {
            res.status(403);
          }
        });
      } else {
        res.status(401);
      }
    };
  }
}

export default UserController;
