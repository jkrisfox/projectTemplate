import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public title!: string;

  @Column()
  public date!: string;


  // @OneToOne((type) => Item, {cascade: true})
  // @JoinColumn()
  // public item!: Item;

}
