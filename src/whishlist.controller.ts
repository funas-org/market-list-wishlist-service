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
import { AppService } from './whishlist.service';
import { Response } from 'express';
import { WishlistDTO } from './dtos/whishlist.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  async getWishlist(@Param('id') id: string, @Res() res: Response) {
    const whishlist = await this.appService.getWishlist({ id });
    return res.status(HttpStatus.OK).json({ id: whishlist });
  }

  @Put(':id')
  async updateWishlist(
    @Body() newWishlist: WishlistDTO,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    const updatedWishList = await this.appService.updateWishlist({
      id,
      whishlist: newWishlist,
    });
    return res.status(HttpStatus.OK).json(updatedWishList);
  }

  @Post()
  async createWishlist(@Body() newWishlist: WishlistDTO, @Res() res: Response) {
    await this.appService.createWishlist({
      whishlist: newWishlist,
    });
    return res.status(HttpStatus.CREATED).json(newWishlist);
  }
}
