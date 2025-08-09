import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nombre } from './nombre.entity';
import { NombreController } from './nombre.controller';
import { NombreService } from './nombre.service';

@Module({
  imports: [TypeOrmModule.forFeature([Nombre])],
  providers: [NombreService],
  controllers: [NombreController],
})
export class NombreModule {}