import { Controller, Get,Post,Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TodosService } from './todos.service';

import { CreateTodoDto } from './dto/create-todo.dto';
import { GetTodoFilterDto } from './dto/get-todo-filter.dto';
import { TodoStatusValidationPipe } from './pipes/todo-status-validation.pipe';
import { Todo } from './todo.entity';
import { TodoStatus } from './todo-status.enum';

@Controller('todos')
export class TodosController {
    constructor(private todosService: TodosService){ }

    @Get()
    getTodos(@Query(ValidationPipe) filterDto: GetTodoFilterDto) : Promise<Todo[]>  {
      return this.todosService.getTasks(filterDto)
    }

    

    @Post()
    @UsePipes(ValidationPipe)
    createTodo(@Body() createTodoDto: CreateTodoDto) : Promise<Todo> {
      return this.todosService.createTodos(createTodoDto)
    }

    @Get('/:id')
    getTodoById(@Param('id', ParseIntPipe) id: number) : Promise<Todo> {
      return this.todosService.getTodoById(id)
    }

    @Delete('/:id')
    deleteTodo(@Param('id', ParseIntPipe) id: number) : Promise<void> {
      return this.todosService.deleteTodo(id)
    }

    @Patch('/:id/status')
    updateTodoStatus(@Param('id',ParseIntPipe) id: number, @Body('status', TodoStatusValidationPipe) status: TodoStatus) : Promise<Todo> {
         return this.todosService.updateTodoStatus(id,status);
    }



}
