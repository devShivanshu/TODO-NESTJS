import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { GetTodoFilterDto } from './dto/get-todo-filter.dto';
import { TodoStatus } from './todo-status.enum';
import { Todo } from './todo.entity';
import { TodoRepository } from './todo.repository';

@Injectable()
export class TodosService {
    constructor(
        @InjectRepository(TodoRepository)
        private todoRepository : TodoRepository
    ) {}

    async getTodoById(id: number,user: User) : Promise<Todo>{
        const found = await this.todoRepository.findOne({ where: {id, userId: user.id}});
        if(!found) {
                  throw new NotFoundException('Todo With Id $id Not found');
        }
        return found

    }

    async createTodos(createTodoDto: CreateTodoDto,
        user: User
        ) : Promise<Todo> {
      return this.todoRepository.createTodo(createTodoDto, user)
    }

    async deleteTodo(id: number,user: User) : Promise<void> {
       const result = await  this.todoRepository.delete({id, userId: user.id})
       if(result.affected === 0){
        throw new NotFoundException('Todo With Id $id Not found');
       }
    }

     async updateTodoStatus(id: number,  status: TodoStatus, user: User): Promise<Todo> {
        const todo = await this.getTodoById(id, user)
        todo.status = status;
        await todo.save();
        return todo;

    }

    async getTodos(filterDto : GetTodoFilterDto, user: User) : Promise<Todo[]>{
        return this.todoRepository.getTodos(filterDto, user)

    }




}
