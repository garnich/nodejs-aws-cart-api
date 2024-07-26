import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  import { CartItems } from './CartItems';
  import { User } from '../../users/entity/User';
  import { Status } from '../models';

  import { DBTypes } from '../../types';
  
  @Entity()
  export class Carts {
    @PrimaryGeneratedColumn(DBTypes.UUID)
    id: string;
  
    @Column({ type: DBTypes.UUID, nullable: false })
    user_id: string;
  
    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User;
  
    @OneToMany(() => CartItems, (cartItems) => cartItems.cart)
    items: CartItems[];
  
    @CreateDateColumn({ type: DBTypes.TIMESTAMP, nullable: false })
    created_at: Date;
  
    @UpdateDateColumn({ type: DBTypes.TIMESTAMP, nullable: false })
    updated_at: Date;
  
    @Column({
      type: 'enum',
      enum: Status,
      default: Status.OPEN,
    })
    status: string;
  }