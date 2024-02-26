import { Module, Global } from '@nestjs/common';
import { Client } from 'pg';
import config from './../config';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

const API_KEY = '123456';
const API_KEY_PROD = 'Pro123';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configServe: ConfigType<typeof config>) => {
        const { dbName, user, password, port } = configServe.postgres;
        return {
          type: 'postgres',
          port,
          username: user,
          password,
          database: dbName,
          synchronize: true, // las entidades se sincroniza con la base de datos y crea las tablas
          autoLoadEntities: true, // las entidades sean auto cargadas, busca la entidad y la sincroniza synchronize y autoLoadEntities van juntas
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      //useValue: API_KEY,
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'POSTGRES',
      //useValue: API_KEY,
      //sirbe para ejecutar codigo asincrono y inyeccion de dependencia
      useFactory: (configServe: ConfigType<typeof config>) => {
        const { dbName, user, password, port } = configServe.postgres;
        const client = new Client({
          user,
          //host: 'localhots',
          database: dbName,
          password,
          port,
        });
        client.connect();
        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: [`API_KEY`, 'POSTGRES', TypeOrmModule],
})
export class DatabaseModule {}
