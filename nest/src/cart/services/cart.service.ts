import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Carts } from '../entity/Carts';
import { CartItems } from '../entity/CartItems';
import { Status } from '../models';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Carts) private cartsRepository: Repository<Carts>,
    @InjectRepository(CartItems) private cartItemsRepository: Repository<CartItems>,
  ) {}

  async findByUserId(userId: string): Promise<Carts> {
    return await this.cartsRepository.findOne({
      relations: {
        items: true,
      },
      where: { user_id: userId, status: Status.OPEN },
    });
  }

  async createByUserId(userId: string) {
    return await this.cartsRepository.save({
      user_id: userId,
      items: [],
    });
  }

  async findOrCreateByUserId(userId: string): Promise<Carts> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  async updateByUserId(userId: string, { product, count }): Promise<Carts> {
    const { id } = await this.findOrCreateByUserId(userId);

    const cartItem = await this.cartItemsRepository.findOne({
      where: { cart_id: id, product_id: product.id },
    });

    if (cartItem) {
      if (count === 0) {
        await this.cartItemsRepository.delete(cartItem.id);

        return await this.cartsRepository.findOne({
          relations: {
            items: true,
          },
          where: { id },
        });
      }

      await this.cartItemsRepository.update(cartItem.id, {
        count: count,
      });

      return await this.cartsRepository.findOne({
        relations: {
          items: true,
        },
        where: { id },
      });
    }

    await this.cartItemsRepository.save({
      cart_id: id,
      product_id: product.id,
      price: product.price,
      count: count,
    });

    return await this.cartsRepository.findOne({
      relations: {
        items: true,
      },
      where: { id },
    });
  }

  async removeByUserId(userId: string): Promise<void> {
    await this.cartsRepository.delete({ user_id: userId });
  }

  async setOrderStatus(userId: string, status: string): Promise<Carts> {
    const cart = await this.findByUserId(userId);

    if (!cart) {
      throw new Error('Cart not found');
    }

    return await this.cartsRepository.save({
      ...cart,
      status,
    });
  }
}
