import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as config from 'config';

const dbConfig = config.get('db');

export const typeOrmConfig : TypeOrmModuleOptions = {
   type : dbConfig.type,
   host : "ec2-23-23-128-222.compute-1.amazonaws.com",
   port : 5432,
   username : "urvtjyxnjyslis",
   password : "304588cb68571ceca2b4afabc5b8ed182f18d166089f1c53b8ffdc94263af685",
   database : "d10m2rbia660po",
   synchronize : process.env.TYPE_ORM_SYNC || dbConfig.synchronise,
   autoLoadEntities : true

}