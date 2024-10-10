import { Injectable } from '@nestjs/common';
import { WishlistDTO } from './dtos/whishlist.dto';

const mockWhishlist: WishlistDTO = {
  name: 'Semanal',
  items: [
    {
      name: 'item 1',
      price: 10,
      category: 'category 1',
      maxPrice: 20,
      minPrice: 10,
    },
    {
      name: 'item 2',
      price: 20,
      category: 'category 2',
      maxPrice: 30,
      minPrice: 15,
    },
  ],
};

@Injectable()
export class AppService {
  async getWishlist({ id }: { id: string }) {
    console.log('id', id);
    // Vai bater no banco e pegar os dados da whishlist
    const resp = new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockWhishlist);
      }, 2000);
    });
    return resp;
  }

  async updateWishlist({
    id,
    whishlist,
  }: {
    id: string;
    whishlist: WishlistDTO;
  }) {
    // Vai bater no banco e atualizar a whishlist
    const resp = new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id, whishlist });
      }, 2000);
    });
    return resp;
  }

  async createWishlist({ whishlist }: { whishlist: WishlistDTO }) {
    // Vai bater no banco e criar a whishlist
    const resp = new Promise((resolve) => {
      setTimeout(() => {
        resolve(whishlist);
      }, 2000);
    });
    return resp;
  }
}
