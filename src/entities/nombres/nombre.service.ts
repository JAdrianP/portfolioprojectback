import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nombre } from './nombre.entity';

@Injectable()
export class NombreService {
  constructor(
    @InjectRepository(Nombre)
    private nombreRepository: Repository<Nombre>,
  ) {}

  findAll(): Promise<Nombre[]> {
    return this.nombreRepository.find();
  }
}