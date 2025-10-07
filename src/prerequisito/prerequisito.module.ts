import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrerequisitoService } from './prerequisito.service';
import { PrerequisitoController } from './prerequisito.controller';
import { Prerequisito } from './entities/prerequisito.entity';
import { Materia } from '../materia/entities/materia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Prerequisito, Materia])],
  controllers: [PrerequisitoController],
  providers: [PrerequisitoService],
  exports: [PrerequisitoService],
})
export class PrerequisitoModule {}