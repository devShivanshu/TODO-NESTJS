import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo, TodoStatus } from './todo.model';
import { v1 as uuid} from 'uuid';
import { CreateTodoDto } from './dto/create-todo.dto';
import { GetTodoFilterDto } from './dto/get-todo-filter.dto';

@Injectable()
export class TodosService {
    private todos : Todo[] = [];

    getAllTodos() : Todo[]{
        return this.todos;
    }

    getTodosWithFilter(filterDto : GetTodoFilterDto) : Todo[]{
        const {status, search} = filterDto;

        let todos = this.getAllTodos();
        if(status){
            todos = todos.filter(todo => todo.status === status)
        }

        if(search){
            todos = todos.filter(todo => todo.title.includes(search) || todo.description.includes(search))
        }

        return  todos;
    }

    getTodoById(id: string): Todo {

       const found = this.todos.find(task => task.id === id)
       if(!found) {
          throw new NotFoundException('Todo With Id $id Not found');
       }
       return found;
    }

    createTodos(createTodoDto: CreateTodoDto) : Todo{

        const { title, description} = createTodoDto;
        const todo: Todo = {
            id: uuid(),
            title,
            description,
            status: TodoStatus.OPEN,

        };

        this.todos.push(todo);
        return todo;
    }

    deleteTodo(id: string) {
        const found = this.getTodoById(id);
       this.todos = this.todos.filter(todo => todo.id !== found.id);

    }

    updateTodoStatus(id: string,  status: TodoStatus): Todo{
        const todo = this.getTodoById(id)
        todo.status = status;

        return todo;

    }


}
