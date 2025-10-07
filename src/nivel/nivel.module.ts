import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NivelService } from './nivel.service';
import { NivelController } from './nivel.controller';
import { Nivel } from './entities/nivel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Nivel])],
  controllers: [NivelController],
  providers: [NivelService],
  exports: [NivelService], // Para usar en otros módulos
})
export class NivelModule {}