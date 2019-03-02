import { iUser } from './user.interface';

export interface iTodo {
    id: number | undefined;
    title: string;
    dueDate: Date | undefined;
    complete: boolean;
    user: iUser | null;
}