import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTipoDto {
  @ApiProperty({
    description: 'Nombre del tipo de materia',
    example: 'Obligatoria',
    maxLength: 255,
  })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser texto' })
  @MaxLength(255, { message: 'El nombre no puede superar los 255 caracteres' })
  nombre: string;
}