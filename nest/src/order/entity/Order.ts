import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { DBTypes } from '../../types';
  
  import { Carts } from '../../cart/entity/Carts';
  import { User } from '../../users/entity/User';
  
  @Entity()
  export class Orders {
    @PrimaryGeneratedColumn(DBTypes.UUID)
    id: string;
  
    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User;
  
    @Column({ type: 'uuid', nullable: false })
    user_id: string;
  
    @OneToOne(() => Carts)
    @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
    cart: Carts;
  
    @Column({ type: DBTypes.UUID, nullable: false })
    cart_id: string;
  
    @Column({ type: DBTypes.JSON, nullable: true })
    payment: string;
  
    @Column({ type: DBTypes.JSON, nullable: true })
    delivery: string;
  
    @Column({ type: DBTypes.TEXT, nullable: true })
    comments: string;
  
    @Column({ type: DBTypes.TEXT, nullable: true })
    status: string;
  
    @Column({ type: DBTypes.INT, nullable: true })
    total: number;
  }