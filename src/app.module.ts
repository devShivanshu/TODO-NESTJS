import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [TodosModule, TypeOrmModule.forRoot(typeOrmConfig)],

})
export class AppModule {}
