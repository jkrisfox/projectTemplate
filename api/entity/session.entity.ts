import { Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./user.entity";

@Entity()
export default class Session {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public expiresAt!: Date;

  @Index({unique: true})
  @Column()
  public userId!: number;

  @OneToOne((type) => User)
  @JoinColumn()
  public user!: User;
}
