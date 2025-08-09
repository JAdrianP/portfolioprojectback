import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NombreModule } from './entities/nombres/nombre.module';
import { Nombre } from './entities/nombres/nombre.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Nombre],
      synchronize: true,
      retryAttempts: 10,
      retryDelay: 3000,
    }),
    NombreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
