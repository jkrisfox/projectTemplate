import DefaultController from "./default.controller";

import { NextFunction, Request, Response, Router } from "express";
import express from "express";

import { Session, ToDo } from "../entity";

import { getRepository } from "typeorm";

export class ToDoController extends DefaultController {
    protected initializeRoutes(): express.Router {
        const router = express.Router();

        router.route("/todos")
        .get((req: Request, res: Response) => {
            const itemRepo = getRepository(ToDo);
            itemRepo.find().then((items: ToDo[]) => {
              res.status(200).send({ items });
            });
          })
        .post((req: Request, res: Response) => {
            const token = req.get("token");
            const sessionRepo = getRepository(Session);
            const todoRepo = getRepository(ToDo);
            const todo = new ToDo();
            sessionRepo.findOne(token).then((foundSession: Session | undefined) => {
                const user = foundSession!.user;
                todo.duedate = req.body.duedate;
                todo.name = req.body.name;
                todo.user = user;
                todo.complete = false;
                todoRepo.save(todo).then((savedTodo: ToDo) => {
                    res.status(200).send({ todo });
                });
            });
        });

        return router;
    }
}