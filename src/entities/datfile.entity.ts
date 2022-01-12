import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { DATFile } from '@/interfaces/datfile.interface';

@Entity()
export class DATFileEntity extends BaseEntity implements DATFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  description?: string;

  @Column()
  version?: string;

  @Column()
  date?: Date;

  @Column()
  author?: string;

  @Column()
  homepage?: string;

  @Column()
  url?: string;

  @Column()
  @IsNotEmpty()
  @Unique(['path'])
  path: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
