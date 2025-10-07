import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNivelDto } from './dto/create-nivel.dto';
import { UpdateNivelDto } from './dto/update-nivel.dto';
import { Nivel } from './entities/nivel.entity';

@Injectable()
export class NivelService {
  constructor(
    @InjectRepository(Nivel)
    private readonly nivelRepository: Repository<Nivel>,
  ) {}

  async create(createNivelDto: CreateNivelDto): Promise<Nivel> {
    const nivel = this.nivelRepository.create(createNivelDto);
    return await this.nivelRepository.save(nivel);
  }

  async findAll(): Promise<Nivel[]> {
    return await this.nivelRepository.find();
  }

  async findOne(id: number): Promise<Nivel> {
    const nivel = await this.nivelRepository.findOne({ where: { id } });
    if (!nivel) {
      throw new NotFoundException(`Nivel con ID ${id} no encontrado`);
    }
    return nivel;
  }

  async update(id: number, updateNivelDto: UpdateNivelDto): Promise<Nivel> {
    await this.findOne(id); // Verifica que existe
    await this.nivelRepository.update(id, updateNivelDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const nivel = await this.findOne(id); // Verifica que existe
    await this.nivelRepository.remove(nivel);
  }
}/*  */