import { IsNotEmpty, IsInt, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreatePrerequisitoDto {
  @ApiProperty({
    description: 'ID de la materia que requiere el prerequisito',
    example: 5,
  })
  @IsNotEmpty({ message: 'El ID de la materia es obligatorio' })
  @Type(() => Number)
  @IsInt({ message: 'El ID de la materia debe ser un número entero' })
  @IsPositive({ message: 'El ID de la materia debe ser un número positivo' })
  materiaId: number;

  @ApiProperty({
    description: 'ID de la materia que es prerequisito',
    example: 2,
  })
  @IsNotEmpty({ message: 'El ID del prerequisito es obligatorio' })
  @Type(() => Number)
  @IsInt({ message: 'El ID del prerequisito debe ser un número entero' })
  @IsPositive({ message: 'El ID del prerequisito debe ser un número positivo' })
  prerequisitoId: number;
}