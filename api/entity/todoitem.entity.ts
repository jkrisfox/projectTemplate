import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ToDoItem {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public data!: string;

  @Column()
  public date!: string;

}
