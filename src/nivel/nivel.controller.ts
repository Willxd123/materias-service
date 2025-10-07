import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NivelService } from './nivel.service';
import { CreateNivelDto } from './dto/create-nivel.dto';
import { UpdateNivelDto } from './dto/update-nivel.dto';

@ApiTags('niveles')
@Controller('nivel')
export class NivelController {
  constructor(private readonly nivelService: NivelService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo nivel' })
  @ApiResponse({ status: 201, description: 'Nivel creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  create(@Body() createNivelDto: CreateNivelDto) {
    return this.nivelService.create(createNivelDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los niveles' })
  @ApiResponse({ status: 200, description: 'Lista de niveles' })
  findAll() {
    return this.nivelService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un nivel por ID' })
  @ApiResponse({ status: 200, description: 'Nivel encontrado' })
  @ApiResponse({ status: 404, description: 'Nivel no encontrado' })
  findOne(@Param('id') id: string) {
    return this.nivelService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un nivel' })
  @ApiResponse({ status: 200, description: 'Nivel actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Nivel no encontrado' })
  update(@Param('id') id: string, @Body() updateNivelDto: UpdateNivelDto) {
    return this.nivelService.update(+id, updateNivelDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un nivel' })
  @ApiResponse({ status: 204, description: 'Nivel eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Nivel no encontrado' })
  remove(@Param('id') id: string) {
    return this.nivelService.remove(+id);
  }
}