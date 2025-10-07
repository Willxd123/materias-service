import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Materia } from '../../materia/entities/materia.entity';

@Entity('prerequisitos')
export class Prerequisito {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'materia_id' })
  materiaId: number;

  @Column({ name: 'prerequisito_id' })
  prerequisitoId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Materia, (materia) => materia.prerequisitos)
  @JoinColumn({ name: 'materia_id' })
  materia: Materia;

  @ManyToOne(() => Materia, (materia) => materia.esPrerrequisitoDeOtrasMaterias)
  @JoinColumn({ name: 'prerequisito_id' })
  prerequisitoMateria: Materia;
}