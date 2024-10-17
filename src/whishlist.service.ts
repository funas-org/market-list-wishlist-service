import { Injectable } from '@nestjs/common';
import { Wishlist } from 'models/wishlist.model';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class WishlistService {
  constructor(
    @InjectModel(Wishlist)
    private wishlistModel: typeof Wishlist,
    private sequelize: Sequelize,
  ) {}

  async getWishlist({ id }: { id: string }) {
    const wishlist = this.wishlistModel.findByPk(id);
    // Aqui nos temos que pegar todos os produtos da wishlist tb
    if (!wishlist) {
      throw new Error('Wishlist not found');
    }
    return wishlist;
  }

  async updateWishlist({ id, wishlist }: { id: string; wishlist: Wishlist }) {
    try {
      await this.sequelize.transaction(async (t) => {
        await this.wishlistModel.update(wishlist, {
          where: { id },
          transaction: t,
        });
      });
      return { id, ...wishlist };
    } catch (error: any) {
      console.error('Error updating wishlist', error);
    }
  }

  async createWishlist({ whishlist }: { whishlist: Wishlist }) {
    const wishlistCreated = this.wishlistModel.create(whishlist);
    return wishlistCreated;
  }
}
