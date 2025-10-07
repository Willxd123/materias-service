import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PrerequisitoService } from './prerequisito.service';
import { CreatePrerequisitoDto } from './dto/create-prerequisito.dto';
import { UpdatePrerequisitoDto } from './dto/update-prerequisito.dto';

@ApiTags('prerequisitos')
@Controller('prerequisito')
export class PrerequisitoController {
  constructor(private readonly prerequisitoService: PrerequisitoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo prerequisito' })
  @ApiResponse({ status: 201, description: 'Prerequisito creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  create(@Body() createPrerequisitoDto: CreatePrerequisitoDto) {
    return this.prerequisitoService.create(createPrerequisitoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los prerequisitos' })
  @ApiResponse({ status: 200, description: 'Lista de prerequisitos con sus relaciones' })
  findAll() {
    return this.prerequisitoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un prerequisito por ID' })
  @ApiResponse({ status: 200, description: 'Prerequisito encontrado' })
  @ApiResponse({ status: 404, description: 'Prerequisito no encontrado' })
  findOne(@Param('id') id: string) {
    return this.prerequisitoService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un prerequisito' })
  @ApiResponse({ status: 200, description: 'Prerequisito actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Prerequisito no encontrado' })
  update(@Param('id') id: string, @Body() updatePrerequisitoDto: UpdatePrerequisitoDto) {
    return this.prerequisitoService.update(+id, updatePrerequisitoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un prerequisito' })
  @ApiResponse({ status: 204, description: 'Prerequisito eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Prerequisito no encontrado' })
  remove(@Param('id') id: string) {
    return this.prerequisitoService.remove(+id);
  }
}