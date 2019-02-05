<<<<<<< HEAD
import { Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../entity"

@Entity()
export class ToDo {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public title!: string;

    @Column()
    public completed!: boolean;

    @Column()
    public duedate!: Date;

    @OneToOne((type) => User, { cascade: true })
    @JoinColumn()
    public user!: User;
}
=======
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../entity";
@Entity()
export class ToDo {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public title!: string;

  @Column()
  public complete!: boolean;

  @Column()
  public dueDate!: Date;

  @OneToOne((type) => User, { cascade: true })
  @JoinColumn()
  public user!: User;
}
>>>>>>> 741e3335db43397093bd5c5fd609569345cb4687
