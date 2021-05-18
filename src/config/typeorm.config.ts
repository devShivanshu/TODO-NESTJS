import { TypeOrmModuleOptions } from "@nestjs/typeorm";
const { DATABASE_URL, DATABASE_PORT, DATABASE_USER, DATABASE_PASS, DATABASE_NAME, DATABASE_HOST } = process.env;


export const typeOrmConfig : TypeOrmModuleOptions = {
   type : "postgres",
   // host: DATABASE_HOST,
   // port : parseInt(DATABASE_PORT),
   // username : DATABASE_USER,
   // password : DATABASE_PASS,
   // database : DATABASE_NAME,
   url: DATABASE_URL,
   synchronize : true,
   autoLoadEntities : true,
}