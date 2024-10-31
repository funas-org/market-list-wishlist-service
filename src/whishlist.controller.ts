import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { WishlistService } from './whishlist.service';
import { Response } from 'express';
import { Wishlist } from 'models/wishlist.model';
import { WishlistDTO } from './dtos/whishlist.dto';

@Controller()
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get(':id')
  async getWishlist(@Param('id') id: string, @Res() res: Response) {
    const wishlist = await this.wishlistService.getWishlist({ id: Number(id) });
    if ('error' in wishlist) {
      return res.status(HttpStatus.NOT_FOUND).json(wishlist);
    }
    return res.status(HttpStatus.OK).json(wishlist);
  }

  @Put(':id')
  async updateWishlist(
    @Body() newWishlist: Wishlist,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    const updatedWishList = await this.wishlistService.updateWishlist({
      id,
      wishlist: newWishlist,
    });
    if (!updatedWishList) {
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        message: 'Something went wrong',
      });
    }
    return res.status(HttpStatus.OK).json(updatedWishList);
  }

  @Post()
  async createWishlist(@Body() newWishlist: WishlistDTO, @Res() res: Response) {
    const response = await this.wishlistService.createWishlist({
      whishlist: newWishlist,
    });
    return res.status(HttpStatus.CREATED).json(response);
  }

  @Get(':id/check-exists')
  async checkIfWishlistExists(@Param('id') id: string, @Res() res: Response) {
    const wishlist = await this.wishlistService.getWishlist({ id: Number(id) });
    return res.status(HttpStatus.OK).json(!!wishlist);
  }
}
