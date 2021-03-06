import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcryptjs'
import { Todo } from "src/todos/todo.entity";

@Entity()
@Unique(['username'])
export class User extends BaseEntity{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @OneToMany(type => Todo, todo => todo.user, {eager : true}  )
    todo: Todo[]

    async validatePassword(password: string) : Promise<boolean> {
        const hash = await bcrypt.hash(password,this.salt);
        return hash === this.password;
    }
}