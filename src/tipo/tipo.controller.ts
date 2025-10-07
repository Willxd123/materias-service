import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TipoService } from './tipo.service';
import { CreateTipoDto } from './dto/create-tipo.dto';
import { UpdateTipoDto } from './dto/update-tipo.dto';

@ApiTags('tipos')
@Controller('tipo')
export class TipoController {
  constructor(private readonly tipoService: TipoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo tipo de materia' })
  @ApiResponse({ status: 201, description: 'Tipo creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  create(@Body() createTipoDto: CreateTipoDto) {
    return this.tipoService.create(createTipoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los tipos de materia' })
  @ApiResponse({ status: 200, description: 'Lista de tipos' })
  findAll() {
    return this.tipoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un tipo por ID' })
  @ApiResponse({ status: 200, description: 'Tipo encontrado' })
  @ApiResponse({ status: 404, description: 'Tipo no encontrado' })
  findOne(@Param('id') id: string) {
    return this.tipoService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un tipo' })
  @ApiResponse({ status: 200, description: 'Tipo actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Tipo no encontrado' })
  update(@Param('id') id: string, @Body() updateTipoDto: UpdateTipoDto) {
    return this.tipoService.update(+id, updateTipoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un tipo' })
  @ApiResponse({ status: 204, description: 'Tipo eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Tipo no encontrado' })
  remove(@Param('id') id: string) {
    return this.tipoService.remove(+id);
  }
}