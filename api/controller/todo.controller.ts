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
      const token = req.get("token");
      const sessionRepo = getRepository(Session);
      const todoRepo = getRepository(ToDo);
      sessionRepo.findOne(token, {relations:["user"]}).then((foundSession: Session | undefined) => {
        const user = foundSession!.user;
        todoRepo.find({user: user}).then((todos: ToDo[])=> {
          res.send({todos}); 
        });
      });
    })
    .post((req: Request, res: Response) => {
      const token = req.get("token");
      const sessionRepo = getRepository(Session);
      const todoRepo = getRepository(ToDo);
      const todo = new ToDo();
      sessionRepo.findOne(token, {relations:["user"]}).then((foundSession: Session | undefined) => {
        const user = foundSession!.user;
        todo.dueDate = req.body.dueDate;
        todo.title = req.body.title;
        todo.user = user;
        todoRepo.save(todo).then((savedTodo: ToDo) => {
          res.status(200).send({ todo });
        });
      });
    });

    router.route("/todos/:id")
    .put((req: Request, res: Response) => {
      const token = req.get("token");
      const sessionRepo = getRepository(Session);
      const todoRepo = getRepository(ToDo);
      sessionRepo.findOne(token, {relations:["user"]}).then((foundSession: Session | undefined) => {
        todoRepo.findOneOrFail(req.params.id).then((todo) => {
          todo.complete = req.body.complete;
          todoRepo.save(todo).then((savedTodo: ToDo) => {
            res.status(200).send({ todo });
          });
        });
      });
    })
    .delete((req: Request, res: Response) => {
      const id = req.params.id;
      getRepository(ToDo).delete({id}).then(() => {
        res.send(200);
      });
    });



    return router;
  }
}