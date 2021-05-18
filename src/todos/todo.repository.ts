import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { GetTodoFilterDto } from "./dto/get-todo-filter.dto";
import { TodoStatus } from "./todo-status.enum";
import { Todo } from "./todo.entity";

@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {
    async createTodo(createTodoDto: CreateTodoDto, user: User) : Promise<Todo> {
        const { title, description} = createTodoDto;
        const todo = new Todo();
        todo.title = title;
        todo.description = description;
        todo.status = TodoStatus.OPEN;
        todo.user = user;
        await todo.save();
        delete todo.user;

        return todo;
    }

    async getTodos(filterDto: GetTodoFilterDto, user:User) : Promise<Todo[]> {
        const {status, search} = filterDto;
        const query = this.createQueryBuilder('todo');

        query.where('todo.userId = :userId', { userId: user.id});
        
        if(status){
            query.andWhere('todo.status = :status',{ status})
        }
    
        const todos = await query.getMany();
        return todos;

    }
   
}