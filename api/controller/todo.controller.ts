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
      if (token == null) {
        throw new Error("Not authorized.");
      }
      const sessionRepo = getRepository(Session);
      const todoRepo = getRepository(ToDo);
      const todo = new ToDo();

      sessionRepo.findOne(token).then((foundSession: Session | undefined) => {
        if (foundSession) {
          const user = foundSession.user;
          console.log(foundSession);
          todo.dueDate = req.body.dueDate;
          todo.title = req.body.title;
          todo.complete = req.body.completed;
          todo.user = user;
          todoRepo.save(todo).then((savedTodo: ToDo | undefined) => {
            if (savedTodo) {
              res.status(200).send({ savedTodo });
            } else {
              res.status(500).send("Could not save todo.");
            }
          });
          } else {
            res.status(401).send("Could not match the given token.");
          }
      });
    }).get((req: Request, res: Response) => {
        const token = req.get("token");
        if (token == null) {
          throw new Error("Not authorized.");
        }
        const sessionRepo = getRepository(Session);
        const todoRepo = getRepository(ToDo);
        sessionRepo.findOneOrFail(token).then((foundSession: Session) => {
            const u = foundSession!.user;
            todoRepo.find({where: [{user: u}]}).then((results: ToDo[]) => {
                res.status(200).send(results);
            });
        }).catch((e: Error) => res.status(401).send({error: e}));
    });
    router.route("/todos/:id").put((req: Request, res: Response) => {
        const todoRepo = getRepository(ToDo);
        const { title, dueDate, completed } = req.body;
        todoRepo.findOneOrFail(req.params.id).then((foundToDo: ToDo) => {
          foundToDo.title = title;
          foundToDo.dueDate = dueDate;
          foundToDo.complete = completed;
          todoRepo.save(foundToDo).then(() => {
              res.status(200).send({todo: foundToDo});
          });
        });
      })
      .delete((req: Request, res: Response) => {
        const todoRepo = getRepository(ToDo);
        const sessionRepo = getRepository(Session);
        const token = req.get("token");
        todoRepo.findOneOrFail({where: [{id: req.params.id}]}).then((foundTodo: ToDo) => {
          sessionRepo.findOneOrFail(token).then((session: Session) => {
            if (session.user === foundTodo.user) {
              todoRepo.delete(foundTodo).then(() => {
                res.status(200).send(foundTodo);
              })
              .catch((e: Error) => res.status(500).send({error: e}));
            }
          }).catch((e: Error) => res.status(401).send({error: e}));
        }).catch((e: Error) => res.status(404).send({error: e}));
      });

    return router;
  }
}
