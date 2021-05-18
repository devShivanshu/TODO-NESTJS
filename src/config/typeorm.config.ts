import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as config from 'config';

const dbConfig = config.get('db');

export const typeOrmConfig : TypeOrmModuleOptions = {
   type : dbConfig.type,
   host : process.env.HOST_NAME || dbConfig.host,
   port : process.env.PORT_NAME || dbConfig.port,
   username : process.env.USERNAME || dbConfig.username,
   password : process.env.PASSWORD || dbConfig.password,
   database : process.env.DATABASE || dbConfig.database,
   synchronize : process.env.TYPE_ORM_SYNC || dbConfig.synchronise,
   autoLoadEntities : true

}