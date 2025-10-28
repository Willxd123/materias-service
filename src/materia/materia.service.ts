import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';
import { Materia } from './entities/materia.entity';

@Injectable()
export class MateriaService {
  constructor(
    @InjectRepository(Materia)
    private readonly materiaRepository: Repository<Materia>,
  ) {}

  async create(createMateriaDto: CreateMateriaDto): Promise<Materia> {
    const materia = this.materiaRepository.create(createMateriaDto);
    return await this.materiaRepository.save(materia);
  }

  async findAll(): Promise<Materia[]> {
    return await this.materiaRepository.find({
      relations: ['nivel', 'tipo'],
    });
  }

  async findOne(id: number): Promise<Materia> {
    const materia = await this.materiaRepository.findOne({
      where: { id },
      relations: ['nivel', 'tipo', 'prerequisitos', 'prerequisitos.prerequisitoMateria'],
    });
    if (!materia) {
      throw new NotFoundException(`Materia con ID ${id} no encontrada`);
    }
    return materia;
  }

  async update(id: number, updateMateriaDto: UpdateMateriaDto): Promise<Materia> {
    await this.findOne(id); // Verifica que existe
    await this.materiaRepository.update(id, updateMateriaDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const materia = await this.findOne(id); // Verifica que existe
    await this.materiaRepository.remove(materia);
  }

  async findByIds(ids: number[]): Promise<Materia[]> {
    if (!ids || ids.length === 0) {
      return [];
    }
    return await this.materiaRepository.find({
      where: {
        id: In(ids), // Usa el operador 'In' de TypeORM
      },
      relations: ['nivel', 'tipo', 'prerequisitos', 'prerequisitos.prerequisitoMateria'], // Incluye las relaciones que necesites
    });
  }

async findAllConPrerequisitos(): Promise<any[]> {
  const materias = await this.materiaRepository.find({
    relations: ['nivel', 'tipo', 'prerequisitos'],
  });
  
  return materias.map(materia => ({
    id: materia.id,
    sigla: materia.sigla,
    nombre: materia.nombre,
    creditos: materia.creditos,
    nivelId: materia.nivelId,
    tipoId: materia.tipoId,
    nivel: materia.nivel,
    tipo: materia.tipo,
    prerequisitosIds: (materia.prerequisitos || []).map(p => p.prerequisitoId) // CORREGIDO
  }));
}
}