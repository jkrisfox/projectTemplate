import { 
  Column, 
  Entity, 
  JoinColumn, 
  ManyToOne, 
  PrimaryGeneratedColumn } from "typeorm";
import { User } from "../entity";

@Entity()
export class ToDo {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public title!: string;

  @Column({default: false})
  public complete!: boolean;

  @Column()
  public dueDate!: Date;

  @ManyToOne((type) => User, user => user.todos)
  @JoinColumn()
  public user!: User;
}
