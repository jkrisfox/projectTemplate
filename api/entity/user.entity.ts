import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ToDo } from "./todo.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public firstName!: string;

  @Column()
  public lastName!: string;

  @Column()
  public password!: string;

  @Column({default: null})
  public profileUrl!: string;

  @Column()
  @Index({ unique: true })
  public emailAddress!: string;

  @OneToMany((type) => ToDo, (todo) => todo.user)
  public todos!: ToDo[];
}
