import DefaultController from "./default.controller";

import { NextFunction, Request, Response, Router } from "express";
import express from "express";
import { getRepository } from "typeorm";

import { Session, ToDo } from "../entity"

export class TodoController extends DefaultController {
    protected initializeRoutes(): express.Router {
        const router = express.Router()

        router.route("/todos")
            .get((req: Request, res: Response) => {
                const token = req.get("token");
                const sessionRepo = getRepository(Session);
                const todoRepo = getRepository(ToDo);
                const todos: ToDo[] = []
                sessionRepo.findOne(token).then((foundSession: Session | undefined) => {
                    if (foundSession) {
                        const user = foundSession.user;
                        todoRepo.find({where: {user: user}}).then((foundTodos: ToDo[] | undefined) => {
                            if (foundTodos) {
                                res.status(200).send({foundTodos})
                            } else {
                                res.status(404);
                            }
                        })
                    }
                })
            })
            .post((req: Request, res: Response) => {
                const token = req.get("token");
                const sessionRepo = getRepository(Session);
                const todoRepo = getRepository(ToDo);
                const todo = new ToDo();
                sessionRepo.findOne(token).then((foundSession: Session | undefined) => {
                    if (foundSession) {
                        const user = foundSession.user;
                        todo.duedate = req.body.dueDate;
                        todo.title = req.body.title;
                        todo.user = user;
                        todoRepo.save(todo).then((savedTodo: ToDo) => {
                            res.status(200).send({savedTodo});
                        });
                    } else {
                        res.status(404);
                    }
                });
            });
        
        router.route("/todos/:id").put((req: Request, res: Response) => {
            const todoRepo = getRepository(ToDo)
            todoRepo.findOneOrFail(req.params.id).then((foundTodo: ToDo) => {
                foundTodo.completed = req.body.complete;
                todoRepo.save(foundTodo).then((updatedTodo: ToDo) => {
                    res.status(200).send({todo: updatedTodo})
                })
            })
        })

        return router
    }
}