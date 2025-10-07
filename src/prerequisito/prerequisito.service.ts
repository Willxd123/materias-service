import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePrerequisitoDto } from './dto/create-prerequisito.dto';
import { UpdatePrerequisitoDto } from './dto/update-prerequisito.dto';
import { Prerequisito } from './entities/prerequisito.entity';

@Injectable()
export class PrerequisitoService {
  constructor(
    @InjectRepository(Prerequisito)
    private readonly prerequisitoRepository: Repository<Prerequisito>,
  ) {}

  async create(createPrerequisitoDto: CreatePrerequisitoDto): Promise<Prerequisito> {
    const prerequisito = this.prerequisitoRepository.create(createPrerequisitoDto);
    return await this.prerequisitoRepository.save(prerequisito);
  }

  async findAll(): Promise<Prerequisito[]> {
    return await this.prerequisitoRepository.find({
      relations: ['materia', 'prerequisitoMateria'],
    });
  }

  async findOne(id: number): Promise<Prerequisito> {
    const prerequisito = await this.prerequisitoRepository.findOne({
      where: { id },
      relations: ['materia', 'prerequisitoMateria'],
    });
    if (!prerequisito) {
      throw new NotFoundException(`Prerequisito con ID ${id} no encontrado`);
    }
    return prerequisito;
  }

  async update(id: number, updatePrerequisitoDto: UpdatePrerequisitoDto): Promise<Prerequisito> {
    await this.findOne(id); // Verifica que existe
    await this.prerequisitoRepository.update(id, updatePrerequisitoDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const prerequisito = await this.findOne(id); // Verifica que existe
    await this.prerequisitoRepository.remove(prerequisito);
  }
}