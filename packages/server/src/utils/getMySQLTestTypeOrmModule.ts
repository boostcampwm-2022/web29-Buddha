import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';

// test db 접속용
export function getMySQLTestTypeOrmModule() {
  const entityPath = path.join(process.env.PWD, 'src/**/*.entity{.ts,.js}');
  return TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: [entityPath],
    synchronize: true,
  });
}
