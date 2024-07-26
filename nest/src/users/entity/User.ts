import {
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    Entity,
    UpdateDateColumn,
  } from 'typeorm';

  import { DBTypes } from '../../types';
  
  @Entity()
  export class User extends BaseEntity {
    @PrimaryGeneratedColumn(DBTypes.UUID)
    id: string;
  
    @Column({ type: 'varchar', nullable: false })
    name: string;
  
    @Column({ type: 'varchar', nullable: false })
    password: string;
  
    @CreateDateColumn({ type: DBTypes.TIMESTAMP, nullable: false })
    created_at: Date;
  
    @UpdateDateColumn({ type: DBTypes.TIMESTAMP, nullable: false })
    updated_at: Date;
  }
