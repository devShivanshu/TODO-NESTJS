import { Controller, Get,Post,Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo, TodoStatus } from './todo.model';
import { CreateTodoDto } from './dto/create-todo.dto';
import { GetTodoFilterDto } from './dto/get-todo-filter.dto';

@Controller('todos')
export class TodosController {
    constructor(private todosService: TodosService){ }

    @Get()
    getTodos(@Query() filterDto: GetTodoFilterDto) : Todo[] {
        if(Object.keys(filterDto).length){
          return this.todosService.getTodosWithFilter(filterDto)
        }
        else return this.todosService.getAllTodos();
    }

    

    @Post()
    @UsePipes(ValidationPipe)
    createTodo(@Body() createTodoDto: CreateTodoDto) : Todo {
      return this.todosService.createTodos(createTodoDto)
    }

    @Get('/:id')
    getTodoById(@Param('id') id: string) : Todo {
      return this.todosService.getTodoById(id)
    }

    @Delete('/:id')
    deleteTodo(@Param('id') id: string) {
      this.todosService.deleteTodo(id)
    }

    @Patch('/:id/status')
    updateTodoStatus(@Param('id') id: string, @Body('status') status: TodoStatus) : Todo {
         return this.todosService.updateTodoStatus(id,status);
    }



}
