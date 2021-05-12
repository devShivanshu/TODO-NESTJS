import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

    async getTodoById(id: number) : Promise<Todo>{
        const found = await this.todoRepository.findOne(id);
        if(!found) {
                  throw new NotFoundException('Todo With Id $id Not found');
        }
        return found

    }

    async createTodos(createTodoDto: CreateTodoDto) : Promise<Todo> {
      return this.todoRepository.createTodo(createTodoDto)
    }

    async deleteTodo(id: number) : Promise<void> {
       const result = await  this.todoRepository.delete(id)
       if(result.affected === 0){
        throw new NotFoundException('Todo With Id $id Not found');
       }
    }

     async updateTodoStatus(id: number,  status: TodoStatus): Promise<Todo> {
        const todo = await this.getTodoById(id)
        todo.status = status;
        await todo.save();
        return todo;

    }

    async getTasks(filterDto : GetTodoFilterDto) : Promise<Todo[]>{
        return this.todoRepository.getTodos(filterDto)

    }




}
