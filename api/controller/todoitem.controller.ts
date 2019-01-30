import DefaultController from "./default.controller";

import { Request, Response, Router } from "express";

import { getRepository } from "typeorm";
import { ToDoItem } from "../entity";

export class ToDoItemController extends DefaultController {
  protected initializeRoutes(): Router {
    const router = Router();
    router
      .route("/todoitems")
      .get((req: Request, res: Response) => {
        const itemRepo = getRepository(ToDoItem);
        itemRepo.find().then((items: ToDoItem[]) => {
          res.status(200).send({ items });
        });
      })
      .post((req: Request, res: Response) => {
        const itemRepo = getRepository(ToDoItem);
        const { data, date } = req.body;
        const item = new ToDoItem();
        item.data = data;
        item.date = date;
        itemRepo.save(item).then(
          (updatedToDoItem) => {
            res.status(200).send({ item });
          },
          (reason: any) => {
            res.status(500).send({ reason });
          },
        );
      });
    return router;
  }
}

export default ToDoItemController;
