import { Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumnm} from "typeorm";
import { User } from "./user.entity";

@Entity()
export class ToDo {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public title!: string;

    @Column()
    public complete!:boolean;

    @Column()
    public duedate!: Date;

    //todo belongs to a user
    @OneToOne((type)=> User, {cascade:true})
    @JoinColumn()
    public user!:User;
}