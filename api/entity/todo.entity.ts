import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../entity";

@Entity()
export class ToDo {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public name!: string;

    @Column()
    public complete!: boolean;

    @Column()
    public duedate!: string;

    @OneToOne((type) => User, {cascade: true})
    @JoinColumn()
    public user!: User;
}