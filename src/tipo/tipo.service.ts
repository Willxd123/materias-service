import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTipoDto } from './dto/create-tipo.dto';
import { UpdateTipoDto } from './dto/update-tipo.dto';
import { Tipo } from './entities/tipo.entity';

@Injectable()
export class TipoService {
  constructor(
    @InjectRepository(Tipo)
    private readonly tipoRepository: Repository<Tipo>,
  ) {}

  async create(createTipoDto: CreateTipoDto): Promise<Tipo> {
    const tipo = this.tipoRepository.create(createTipoDto);
    return await this.tipoRepository.save(tipo);
  }

  async findAll(): Promise<Tipo[]> {
    return await this.tipoRepository.find();
  }

  async findOne(id: number): Promise<Tipo> {
    const tipo = await this.tipoRepository.findOne({ where: { id } });
    if (!tipo) {
      throw new NotFoundException(`Tipo con ID ${id} no encontrado`);
    }
    return tipo;
  }

  async update(id: number, updateTipoDto: UpdateTipoDto): Promise<Tipo> {
    await this.findOne(id); // Verifica que existe
    await this.tipoRepository.update(id, updateTipoDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const tipo = await this.findOne(id); // Verifica que existe
    await this.tipoRepository.remove(tipo);
  }
}