import { Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import { User } from "./user.entity";

@Entity()
export class ToDo {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({default: null})
    public title!: string;

    @Column({default: null})
    public complete!:boolean;

    @Column({default: null})
    public duedate!: Date;

    //todo belongs to a user
    @OneToOne((type)=> User, {cascade:true})
    @JoinColumn()
    public user!:User;
}
