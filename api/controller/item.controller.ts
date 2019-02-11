import DefaultController from "./default.controller";

import { Request, Response, Router } from "express";

import { getRepository } from "typeorm";
import { Item } from "../entity";

export class ItemController extends DefaultController {
  protected initializeRoutes(): Router {
    const router = Router();
    router
      .route("/items")
      .get((req: Request, res: Response) => {
        const itemRepo = getRepository(Item);
        itemRepo.find().then((items: Item[]) => {
          res.status(200).send({ items });
        });
      })
      .post((req: Request, res: Response) => {
        const itemRepo = getRepository(Item);
        const { name, date} = req.body;
        const item = new Item();
        item.title = name;
        item.date = date;
        debugger;
        itemRepo.save(item).then(
          (updateditem) => {
            res.status(200).send({ item });
          },
          (reason: any) => {
            res.status(500).send({ reason });
          },
        );
      });
    router.route("/items/:id")
    .delete((req: Request, res: Response)   => {
      const id = req.params.id;
      getRepository(Item).delete({id}).then(() => {
        res.send(200);
      })
    })
    return router;
  }
}

export default ItemController;
