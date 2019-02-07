import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @ManyToOne((type) => User, { cascade: true })
    @JoinColumn()
    public user!: User;
}