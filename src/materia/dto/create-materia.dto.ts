import { IsNotEmpty, IsString, IsInt, IsPositive, MaxLength, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateMateriaDto {
  @ApiProperty({
    description: 'Sigla de la materia',
    example: 'MAT-101',
    maxLength: 255,
  })
  @IsNotEmpty({ message: 'La sigla es obligatoria' })
  @IsString({ message: 'La sigla debe ser texto' })
  @MaxLength(255, { message: 'La sigla no puede superar los 255 caracteres' })
  sigla: string;

  @ApiProperty({
    description: 'Nombre de la materia',
    example: 'Cálculo I',
    maxLength: 255,
  })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser texto' })
  @MaxLength(255, { message: 'El nombre no puede superar los 255 caracteres' })
  nombre: string;

  @ApiProperty({
    description: 'Créditos de la materia',
    example: 4,
    minimum: 1,
  })
  @IsNotEmpty({ message: 'Los créditos son obligatorios' })
  @Type(() => Number)
  @IsInt({ message: 'Los créditos deben ser un número entero' })
  @Min(1, { message: 'Los créditos deben ser al menos 1' })
  creditos: number;

  @ApiProperty({
    description: 'ID del nivel',
    example: 1,
  })
  @IsNotEmpty({ message: 'El nivel es obligatorio' })
  @Type(() => Number)
  @IsInt({ message: 'El nivel debe ser un número entero' })
  @IsPositive({ message: 'El nivel debe ser un número positivo' })
  nivelId: number;

  @ApiProperty({
    description: 'ID del tipo',
    example: 1,
  })
  @IsNotEmpty({ message: 'El tipo es obligatorio' })
  @Type(() => Number)
  @IsInt({ message: 'El tipo debe ser un número entero' })
  @IsPositive({ message: 'El tipo debe ser un número positivo' })
  tipoId: number;
}