import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NombreModule } from './entities/nombres/nombre.module';
import { Nombre } from './entities/nombres/nombre.entity';
import { User } from './auth/users/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Nombre, User],
      synchronize: true,
      retryAttempts: 10,
      retryDelay: 3000,
    }),
    NombreModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

//LOCAL CONFIG
/*@Module({
  imports: [
    //TODO ADRIAN, RESTAURAR ESTO A LOS VALORES QUE TENIA 
    //USANDO LAS VARIABLES DE ENTRONO DE DOCKER LOCALHOST Y LO
    //DEMAS ES SOLO PARA PRUEBAS EN LOCAL
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'frontstartdb',
      entities: [Nombre, User],
      synchronize: true,
      retryAttempts: 10,
      retryDelay: 3000,
    }),
    NombreModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}*/
