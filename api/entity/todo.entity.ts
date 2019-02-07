import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../entity";
@Entity()
export class ToDo {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({default:null})
  public title!: string;

  @Column({default:null})
  public complete!: boolean;

  @Column({default:null})
  public ddate!: Date;

  @ManyToOne((type) => User, { cascade: true })
  @JoinColumn()
  public user!: User;
}
