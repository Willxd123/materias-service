import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { MateriaService } from './materia.service';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';

@ApiTags('materias')
@Controller('materia')
export class MateriaController {
  constructor(private readonly materiaService: MateriaService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva materia' })
  @ApiResponse({ status: 201, description: 'Materia creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  create(@Body() createMateriaDto: CreateMateriaDto) {
    return this.materiaService.create(createMateriaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las materias' })
  @ApiResponse({ status: 200, description: 'Lista de materias con sus relaciones (nivel, tipo)' })
  findAll() {
    return this.materiaService.findAll();
  }
  @Get('con-prerequisitos')
  @ApiOperation({ summary: 'Obtener todas las materias con sus prerequisitos' })
  findAllConPrerequisitos() {
    return this.materiaService.findAllConPrerequisitos();
  }
  @Get(':id')
  @ApiOperation({ summary: 'Obtener una materia por ID' })
  @ApiResponse({ status: 200, description: 'Materia encontrada con sus prerequisitos' })
  @ApiResponse({ status: 404, description: 'Materia no encontrada' })
  findOne(@Param('id') id: string) {
    return this.materiaService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una materia' })
  @ApiResponse({ status: 200, description: 'Materia actualizada exitosamente' })
  @ApiResponse({ status: 404, description: 'Materia no encontrada' })
  update(@Param('id') id: string, @Body() updateMateriaDto: UpdateMateriaDto) {
    return this.materiaService.update(+id, updateMateriaDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar una materia' })
  @ApiResponse({ status: 204, description: 'Materia eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Materia no encontrada' })
  remove(@Param('id') id: string) {
    return this.materiaService.remove(+id);
  }

 
}