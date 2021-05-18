import { TypeOrmModuleOptions } from "@nestjs/typeorm";
const { DATABASE_URL, DATABASE_PORT, DATABASE_USER, DATABASE_PASS, DATABASE_NAME, DATABASE_HOST } = process.env;


export const typeOrmConfig : TypeOrmModuleOptions = {
   type : "postgres",
   url: DATABASE_URL,
   port : parseInt(DATABASE_PORT),
   username : DATABASE_USER,
   password : DATABASE_PASS,
   database : DATABASE_NAME,
   synchronize : true,
   autoLoadEntities : true,
   ssl: true
}