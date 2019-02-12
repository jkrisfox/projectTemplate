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
      let token = req.get("token");
      console.log('Get request token:', token);
      const sessionRepo = getRepository(Session);
      sessionRepo.findOne(token || "", {relations: ["user", "user.todos"]})
      .then((foundSession: Session | undefined) => {
        if (foundSession) {
          const user = foundSession!.user;
          res.status(200).send({ todos: user.todos });
          return;
        }
        const todoRepo = getRepository(ToDo);
        todoRepo.find().then((todos: ToDo[]) => {
          res.status(200).send({ todos });
        });
      });
    })
    .post((req: Request, res: Response) => {
      const token = req.get("token");
      console.log('Post request token:', token);
      const sessionRepo = getRepository(Session);
      const todoRepo = getRepository(ToDo);
      const todo = new ToDo();
      sessionRepo.findOne(token || "", {relations: ["user"]})
      .then((foundSession: Session | undefined) => {
        if (!foundSession) {
          res.status(401).send("user unauthenticated");
          return;
        }
        todo.dueDate = req.body.dueDate;
        todo.title = req.body.title;
        todo.complete = req.body.complete;
        todo.user = foundSession.user;
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
    .delete(async (req: Request, res: Response) => {
      let token = req.get("token");
      console.log('Delete request token:', token);
      const sessionRepo = getRepository(Session);
      const todoRepo = getRepository(ToDo);
      sessionRepo.findOne(token || "", {relations: ["user"]})
      .then((foundSession: Session | undefined) => {
        if (!foundSession) {
          res.status(401).send("user unauthenticated");
          return;
        }
        const user = foundSession.user;
        todoRepo.delete({id: req.params.id, user: user}).then(deleteResult => {
          res.status(200).send("Success");
        });
      });
    });
    return router;
  }
}
