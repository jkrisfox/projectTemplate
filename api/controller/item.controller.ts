import DefaultController from "./default.controller";

import { NextFunction, Request, Response, Router } from "express";

import { getRepository } from "typeorm";
import { Session, Item } from "../entity";

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
        const { name, description, price, imageUrls, stockCount, tags, inStoreOnly } = req.body;
        const item = new Item();
        item.name = name;
        item.description = description;
        item.price = price;
        item.imageUrls = imageUrls;
        item.stockCount = stockCount;
        item.tags = tags;
        item.inStoreOnly = inStoreOnly;
        itemRepo.save(item).then(
          createdItem => {
            res.status(200).send({ createdItem });
          },
          (reason: any) => {
            res.status(500).send({ reason: "The item could not be added" });
          }
        );
      });
    
    router.route("/items/:id").get((req: Request, res: Response) => {
      const itemRepo = getRepository(Item);
      itemRepo.findOne(req.params.id).then(
        (item: Item | undefined) => {
          if (item) {
            res.send({ item });
          } else {
            res.sendStatus(404);
          }
        },
        () => {
          res.sendStatus(404);
        }
      );
    })
    .delete((req: Request, res: Response) => {
        const token = req.get("token");
        const sessionRepo = getRepository(Session);
        const itemRepo = getRepository(Item);
        sessionRepo.findOne(token, {relations: ["user"]}).then((foundSession: Session | undefined) => {
          itemRepo.delete({id: req.params.id}).then(deleteResult => {
            res.sendStatus(200);
          });
        });
      })
      .put((req: Request, res: Response) => {
        const itemRepo = getRepository(Item);
        itemRepo.findOneOrFail(req.params.id).then((foundItem: Item) => {
            const { name, description, price, imageUrls, stockCount, tags, inStoreOnly } = req.body;
            foundItem.name = name;
            foundItem.description = description;
            foundItem.price = price;
            foundItem.imageUrls = imageUrls;
            foundItem.stockCount = stockCount;
            foundItem.tags = tags;
            foundItem.inStoreOnly = inStoreOnly;
            itemRepo.save(foundItem).then((updatedItem: Item) => {
            res.send(200).send({item: updatedItem});
          });
        });
      });
    return router;
  }

}

export default ItemController;
