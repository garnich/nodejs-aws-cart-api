import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  import { Carts } from './Carts';

  import { DBTypes } from '../../types';

  
  @Entity()
  export class CartItems {
    @PrimaryGeneratedColumn(DBTypes.UUID)
    id: string;
  
    @Column({ type: DBTypes.UUID, nullable: false })
    cart_id: string;
  
    @ManyToOne(() => Carts)
    @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
    cart: Carts;
  
    @Column({ type: DBTypes.UUID, nullable: false })
    product_id: string;
  
    @Column({ type: DBTypes.INT, nullable: false, default: 1 })
    price: number;
  
    @Column({ type: DBTypes.INT, nullable: false })
    count: number;
  }