import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Nivel } from '../../nivel/entities/nivel.entity';
import { Tipo } from '../../tipo/entities/tipo.entity';
import { Prerequisito } from '../../prerequisito/entities/prerequisito.entity';

@Entity('materias')
export class Materia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  sigla: string;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'integer' })
  creditos: number;

  @Column({ name: 'nivel_id' })
  nivelId: number;

  @Column({ name: 'tipo_id' })
  tipoId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Nivel, (nivel) => nivel.materias)
  @JoinColumn({ name: 'nivel_id' })
  nivel: Nivel;

  @ManyToOne(() => Tipo, (tipo) => tipo.materias)
  @JoinColumn({ name: 'tipo_id' })
  tipo: Tipo;

  @OneToMany(() => Prerequisito, (prerequisito) => prerequisito.materia)
  prerequisitos: Prerequisito[];

  @OneToMany(() => Prerequisito, (prerequisito) => prerequisito.prerequisitoMateria)
  esPrerrequisitoDeOtrasMaterias: Prerequisito[];
}