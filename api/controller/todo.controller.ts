import DefaultController from "./default.controller";

import { NextFunction, Request, Response, Router } from "express";
import express from "express";

import { Session, ToDo, User } from "../entity";

import { getRepository } from "typeorm";

export class ToDoController extends DefaultController {
  protected initializeRoutes(): express.Router {
    const router = express.Router();

    router.route("/todos")
    .get((req: Request, res: Response) => {
      const todoRepo = getRepository(ToDo);
      const sessionRepo = getRepository(Session);
      const token = req.get("token");
      sessionRepo.findOne(token, {relations: ["user", "user.todos"]}).then((foundSession: Session | undefined) => {
        if (foundSession) {
          const user = foundSession!.user;
          res.status(200).send(user.todos);
        }
      });
    })
    .post((req: Request, res: Response) => {
      const token = req.get("token");
      const sessionRepo = getRepository(Session);
      const todoRepo = getRepository(ToDo);
      const todo = new ToDo();
      sessionRepo.findOne(token).then((foundSession: Session | undefined) => {
        const user = foundSession!.user;
        todo.ddate = req.body.ddate;
        todo.title = req.body.title;
        todo.user = req.body.user;
        todoRepo.save(todo).then((savedTodo: ToDo) => {
          res.status(200).send({ todo });
        });
      });
    });
    router.route("/todos/:id")
    .put((req: Request, res: Response) => {
      const todoRepo = getRepository(ToDo);
      todoRepo.findOneOrFail(req.params.id).then((foundToDo: ToDo) => {
        // save updates here
        foundToDo.complete = req.body.complete;
        todoRepo.save(foundToDo).then((updatedTodo: ToDo) => {
          res.send(200).send({todo: updatedTodo});
        });
      });
    })
    .delete((req: Request, res: Response) => {
      const todoRepo = getRepository(ToDo);
      todoRepo.findOneOrFail(req.params.id).then((foundToDo: ToDo) => {
        todoRepo.delete(foundToDo).then(result => {
          res.send(200);
        });
      });
    });
    return router;
  }
}
