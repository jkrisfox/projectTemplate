import DefaultController from "./default.controller";

import { NextFunction, Request, Response, Router } from "express";
import express from "express";

import { Session, ToDo } from "../entity";

import { getRepository } from "typeorm";

export class ToDoController extends DefaultController {
  protected initializeRoutes(): express.Router {
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
        todo.user = user;
        todoRepo.save(todo).then((savedTodo: ToDo) => {
          res.status(200).send({ todo });
        });
      });
      router.route("/todos/:id").put((req: Request, res: Response) => {
        const todoRepo = getRepository(ToDo);
        todo.findOne(req.params.id).then((foundToDo: ToDo) => {
          // save updates here
        });
      });
    }).get((req: Request, res: Response) => {
        const token = req.get("token");
        const sessionRepo = getRepository(Session);
        const todoRepo = getRepository(ToDo);
        const todoList = [];
        sessionRepo.findOne(token).then((foundSession: Session | undefined) => {
            const u = foundSession!.user;
            todoRepo.find({where: [{user: u}]}).then((results: ToDo[] | undefined) => {
                res.statusCode = 200;
                res.send(results);
            });
        });
    });

    return router;
  }
}
