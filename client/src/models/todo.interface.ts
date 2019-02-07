import { iUser } from "./user.interface";

export interface iToDo {
  id: number;
  title: string;
  complete: boolean;
  dueDate: string;
  user: iUser;
}
