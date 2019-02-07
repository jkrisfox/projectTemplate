import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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

  @OneToOne((type) => User, { cascade: true })
  @JoinColumn()
  public user!: User;
}
