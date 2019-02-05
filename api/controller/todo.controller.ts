import DefaultController from "./default.controller";

import {NextFuction, Request, Response, Router} from "express";
import express from "express";

import {Session, ToDo} from "../entity";
import {getRepository } from "typeorm";

export class ToDoController extends DefaultController{
    protected initializeRoutes(): express.Router{
        const router = express.Router();

        router.route("/todos").post((req:Request,res:Response) => {
            const token = req.get("token");
            const sessionRepo = getRepository(Session);
            const todoRepo = getRepository(ToDo);
            const todo = new ToDo();

            sessionRepo.findOne(token).then((foundSession: Session | undefined)==>){
                const user = foundSession!.user;
                todo.duedate = req.body.duedate;
                todo.title = req.body.title;
                todoRepo.save(todo).then((savedTodo: ToDo) => {
                    res.status(200).send({todo});
                })
            }
        })

         return router;
    }

}