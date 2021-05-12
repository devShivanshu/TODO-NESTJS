import { EntityRepository, Repository } from "typeorm";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { GetTodoFilterDto } from "./dto/get-todo-filter.dto";
import { TodoStatus } from "./todo-status.enum";
import { Todo } from "./todo.entity";

@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {
    async createTodo(createTodoDto: CreateTodoDto) : Promise<Todo> {
        const { title, description} = createTodoDto;
        const todo = new Todo();
        todo.title = title;
        todo.description = description;
        todo.status = TodoStatus.OPEN;
        await todo.save();

        return todo;
    }

    async getTodos(filterDto: GetTodoFilterDto) : Promise<Todo[]> {
        const {status, search} = filterDto;
        const query = this.createQueryBuilder('todo');
        if(status){
            query.andWhere('todo.status = :status',{ status})
        }
    
        const todos = await query.getMany();
        return todos;

    }
   
}