import {iUser} from "./user.interface";

export interface iToDo {
    title: string,
    date: string,
    id: number,
    complete: boolean,
    user: iUser
}