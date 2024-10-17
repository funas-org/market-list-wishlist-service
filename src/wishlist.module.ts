import { Module } from '@nestjs/common';
import { WishlistController } from './whishlist.controller';
import { WishlistService } from './whishlist.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Wishlist } from 'models/wishlist.model';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import { Dialect } from 'sequelize';

const envFile =
  process.env.NODE_ENV === 'production'
    ? '.env.production'
    : '.env.development';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.resolve(process.cwd(), envFile),
    }),
    SequelizeModule.forRoot({
      dialect: process.env.DB_DIALECT as Dialect,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: process.env.NODE_ENV !== 'production',
      models: [Wishlist],
      autoLoadModels: true,
    }),
    SequelizeModule.forFeature([Wishlist]),
  ],
  controllers: [WishlistController],
  providers: [WishlistService],
})
export class AppModule {}
