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

@Controller()
export class WishlistController {
  constructor(private readonly appService: WishlistService) {}

  @Get(':id')
  async getWishlist(@Param('id') id: string, @Res() res: Response) {
    const whishlist = await this.appService.getWishlist({ id });
    return res.status(HttpStatus.OK).json(whishlist);
  }

  @Put(':id')
  async updateWishlist(
    @Body() newWishlist: Wishlist,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    const updatedWishList = await this.appService.updateWishlist({
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
  async createWishlist(@Body() newWishlist: Wishlist, @Res() res: Response) {
    await this.appService.createWishlist({
      whishlist: newWishlist,
    });
    return res.status(HttpStatus.CREATED).json(newWishlist);
  }
}
