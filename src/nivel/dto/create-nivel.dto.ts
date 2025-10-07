import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNivelDto {
  @ApiProperty({
    description: 'Nombre del nivel',
    example: 'Licenciatura',
    maxLength: 255,
  })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser texto' })
  @MaxLength(255, { message: 'El nombre no puede superar los 255 caracteres' })
  nombre: string;
}