import { Controller, Get } from '@nestjs/common';
import { Nombre } from './nombre.entity';
import { NombreService } from './nombre.service';

@Controller('nombres')
export class NombreController {
  constructor(private readonly nombreService: NombreService) {}

  @Get()
  getNombres(): Promise<Nombre[]> {
    return this.nombreService.findAll();
  }
}