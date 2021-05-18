import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { TodosModule } from './todos/todos.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from 'config';

@Module({
  imports: [TodosModule, TypeOrmModule.forRoot(typeOrmConfig), AuthModule],

})
export class AppModule {}
