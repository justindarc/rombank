import config from 'config';
import path from 'path';
import { ConnectionOptions } from 'typeorm';
import { DBConfig } from '@/interfaces/dbconfig.interface';

const { database }: DBConfig = config.get('dbConfig');

export const dbConnection: ConnectionOptions = {
  type: 'sqlite',
  database: database,
  synchronize: true,
  logging: true,
  entities: [path.join(__dirname, 'entities/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, 'migrations/*.migration{.ts,.js}')],
  subscribers: [path.join(__dirname, 'subscribers/*.subscriber{.ts,.js}')],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migrations',
    subscribersDir: 'src/subscribers',
  },
};
