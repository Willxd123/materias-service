import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MateriaService } from './materia.service';
import { MateriaController } from './materia.controller';
import { Materia } from './entities/materia.entity';
import { Nivel } from '../nivel/entities/nivel.entity';
import { Tipo } from '../tipo/entities/tipo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Materia, Nivel, Tipo])],
  controllers: [MateriaController],
  providers: [MateriaService],
  exports: [MateriaService],
})
export class MateriaModule {}