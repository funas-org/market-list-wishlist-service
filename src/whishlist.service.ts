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

  async getWishlistByOwnerEmail({ ownerEmail }: { ownerEmail: string }) {
    const wishlists = await this.wishlistModel.findAll({
      where: { ownerEmail },
    });
    if (!wishlists?.length) {
      return { error: 'Wishlist not found' };
    }
    const productsFromWishlist: any[] = await fetchProduct(
      `/wishlist-products/${wishlists[0].id}`,
    );

    const productCategories: string[] = await fetchProduct('/categories');

    const productsToCategorize = [...productsFromWishlist];
    const productsByCategory = productCategories.map((category) => {
      const productsInThisCategory = [];
      productsToCategorize.forEach((product) => {
        if (product.category === category) {
          productsInThisCategory.push(product);
          productsToCategorize.splice(productsToCategorize.indexOf(product), 1);
        }
      });
      return { category, products: productsInThisCategory };
    });

    const basicWishlist = wishlists[0].get({ plain: true });
    return {
      ...basicWishlist,
      products: productsByCategory,
    };
  }

  async updateWishlist({
    id,
    wishlist,
  }: {
    id: string;
    wishlist: WishlistDTO;
  }) {
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

  async createWishlist({
    whishlist,
    userEmail,
  }: {
    whishlist: WishlistDTO;
    userEmail: string;
  }) {
    const wishlistFound = await this.getWishlistByOwnerEmail({
      ownerEmail: userEmail,
    });
    const HAS_ERROR = 'error' in wishlistFound;
    if (!HAS_ERROR) {
      return { error: 'Wishlist already exists' };
    }
    const wishlistCreated = await this.wishlistModel.create({
      ...whishlist,
      ownerEmail: userEmail,
    });

    return wishlistCreated.get({ plain: true });
  }
}
