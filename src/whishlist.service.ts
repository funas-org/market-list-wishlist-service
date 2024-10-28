import { Injectable } from '@nestjs/common';
import { Wishlist } from 'models/wishlist.model';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { WishlistDTO } from './dtos/whishlist.dto';
import { fetchProduct } from './externals/productFetch';

type WishlistWithProducts = WishlistDTO & { id: number } & { products: any[] };

@Injectable()
export class WishlistService {
  constructor(
    @InjectModel(Wishlist)
    private wishlistModel: typeof Wishlist,
    private sequelize: Sequelize,
  ) {}

  async getWishlist({
    id,
  }: {
    id: number;
  }): Promise<{ error: string } | WishlistWithProducts> {
    const wishlist = await this.wishlistModel.findByPk(id);
    if (!wishlist) {
      return { error: 'Wishlist not found' };
    }
    const productsFromWishlist: any[] = await fetchProduct(
      `/wishlist-products/${id}`,
    );
    const basicWishlist = wishlist.get({ plain: true });
    return {
      ...basicWishlist,
      products: productsFromWishlist,
    };
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

  async createWishlist({ whishlist }: { whishlist: WishlistDTO }) {
    const wishlistCreated = await this.wishlistModel.create(whishlist);

    return wishlistCreated.get({ plain: true });
  }
}
