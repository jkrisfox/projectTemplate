import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../entity";
@Entity()
export class ToDo {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public data!: string;

  @Column()
  public complete!: boolean;

  @Column()
  public date!: Date;

  @ManyToOne((type) => User, user => user.todos)
  @JoinColumn()
  public user!: User;
}