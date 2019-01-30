import DefaultController from "../controller/default.controller";

import express, {NextFunction, Request, Response, Router} from "express";
import { getRepository } from "typeorm";

import {Session, ToDo} from "../entity";

export class TodoController extends DefaultController {
    protected initializeRoutes(): Router {
        const router = express.Router();

        router.route("/todos").post((req: Request, res: Response) => {
            const token = req.get("token");
            const sessionRepo = getRepository(Session);
            const todoRepo = getRepository(ToDo);
            const todo = new ToDo();
            sessionRepo.findOne(token).then((foundSession: Session | undefined) => {
                const user = foundSession!.user;
                todo.dueDate = req.body.dueDate;
                todo.title = req.body.title;
                todoRepo.save(todo).then((savedTodo: ToDo) => {
                    res.status(200).send({loggedOut: true});
                });
            });
        });
        return router;
    }
}
