import DefaultController from "./default.controller";

import { NextFunction, Request, Response, Router } from "express";
import express from "express";

import { Session, ToDo, User } from "../entity";

import { getRepository } from "typeorm";

export class ToDoController extends DefaultController {

  protected initializeRoutes(): express.Router {
    const router = express.Router();

    router.route("/todos").post((req: Request, res: Response) => {
      const todoRepo = getRepository(ToDo);
      const todo = new ToDo();
      this.getUser(req).then((user: User) => {
        todo.dueDate = req.body.dueDate;
        todo.title = req.body.title;
        todo.user = user;
        todoRepo.save(todo).then((savedTodo: ToDo) => {
          res.status(200).send({ todo });
        });
      });
    }).get((req: Request, res: Response) => {
        this.getUser(req).then((user: User) => {
          const todoRepo = getRepository(ToDo);
          todoRepo.find({where: {userId: user.id}}).then((todos: ToDo[]) =>{
            res.send({todos});
          })
        })
    });
    router.route("/todos/:id").put((req: Request, res: Response) => {
      const todoRepo = getRepository(ToDo);
      todoRepo.findOneOrFail(req.params.id).then((foundToDo: ToDo) => {
        // save updates here
        foundToDo.complete = req.body.complete;
        todoRepo.save(foundToDo).then((updatedTodo: ToDo) => {
          res.send(200).send({todo: updatedTodo});
        });
      });
    });
    return router;
  }

  protected getUser(req: Request): Promise<User> {
    const token = req.get("token");
    const sessionRepo = getRepository(Session);
    return sessionRepo.findOneOrFail(token).then((foundSession: Session | undefined) => {
      return foundSession!.user;
    })
  }
}
