import { type } from "os";
import { User } from "src/auth/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TodoStatus } from "./todo-status.enum";

@Entity()
export class Todo extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TodoStatus;

    @ManyToOne(type => User, user => user.todo, {eager  : false})
    user: User;

    @Column()   
    userId: number;
    

}