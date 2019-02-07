import DefaultController from "./default.controller";

import { NextFunction, Request, Response, Router } from "express";
import express from "express";

import { Session, ToDo } from "../entity";

import { getRepository } from "typeorm";

export class ToDoController extends DefaultController {
  protected initializeRoutes(): express.Router {
    const router = express.Router();

    router.use((req: Request, res: Response, next) => {
      const token = req.get("token");
      if (token == null) {
        res.sendStatus(401);
      }
      const sessionRepo = getRepository(Session);
      const todoRepo = getRepository(ToDo);
      sessionRepo.findOne(token).then((foundSession: Session | undefined) => {
        if (foundSession) {
          console.log(foundSession);
          res.locals.foundUser = foundSession.user;
          res.locals.token = token;
          res.locals.sessionRepo = sessionRepo;
          res.locals.todoRepo = todoRepo;
          next();
        } else {
          res.status(401).send("Could not match the given token.");
        }
      });
    });

    router.route("/todos").post((req: Request, res: Response) => {
      const todo = new ToDo();
      const {todoRepo, sessionRepo, foundUser} = res.locals;
      todo.dueDate = req.body.dueDate;
      todo.title = req.body.title;
      todo.complete = req.body.completed;
      todo.user = foundUser;
      console.log(`Saving todo ${todo}`);
      todoRepo.save(todo).then((savedTodo: ToDo | undefined) => {
        if (savedTodo) {
          res.status(200).send({ savedTodo });
        } else {
          res.status(500).send("Could not save todo.");
        }
      });
  }).get((req: Request, res: Response) => {
    const {todoRepo, sessionRepo, foundUser} = res.locals;
    todoRepo.find({where: [{user: foundUser}]}).then((results: ToDo[]) => {
      res.status(200).send(results);
    });
  });

    router.route("todos/:id").put((req: Request, res: Response) => {
    const { title, dueDate, completed } = req.body;
    const {todoRepo, sessionRepo, foundUser} = res.locals;
    todoRepo.findOneOrFail(req.params.id).then((foundToDo: ToDo) => {
      foundToDo.title = title;
      foundToDo.dueDate = dueDate;
      foundToDo.complete = completed;
      todoRepo.save(foundToDo).then(() => {
          res.status(200).send({todo: foundToDo});
      });
    });
  }).delete((req: Request, res: Response) => {
    const passedId: number = req.params.id;
    const {todoRepo, sessionRepo, foundUser} = res.locals;
    todoRepo.findOne(passedId).then((foundTodo: ToDo | undefined) => {
      if (foundTodo) {
        console.log(foundTodo);
        if (foundUser === foundTodo.user) {
          todoRepo.delete(foundTodo).then(() => {
            res.status(200).send(foundTodo);
          })
          .catch((e: Error) => res.status(500).send({error: e}));
        } else {
          res.status(401).send(`User ${foundTodo.user} cannot change todo: ${foundTodo}`);
        }
      } else {
        console.log(`Could not find todo by id ${passedId}`)
        res.status(404).send(`Could not find todo by id ${passedId}`);
      }
    });
  });

    return router;
  }
}
