import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
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

}