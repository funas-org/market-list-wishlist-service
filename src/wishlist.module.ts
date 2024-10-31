import { Module } from '@nestjs/common';
import { WishlistController } from './whishlist.controller';
import { WishlistService } from './whishlist.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Wishlist } from 'models/wishlist.model';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import dbConfig from './config/db.config';
import dbConfigProduction from './config/db.config.production';
import { JwtGuard } from './guards/jwt-auth.guard';
import jwtConfig from './config/jwt.config';
import { JwtStrategy } from './strategies/jwt.strategy';

const envFile =
  process.env.NODE_ENV === 'production'
    ? '.env.production'
    : '.env.development';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.resolve(process.cwd(), envFile),
      load: [dbConfig, dbConfigProduction],
    }),
    ConfigModule.forFeature(jwtConfig),
    SequelizeModule.forRootAsync({
      useFactory:
        process.env.NODE_ENV === 'production' ? dbConfigProduction : dbConfig,
    }),
    SequelizeModule.forFeature([Wishlist]),
  ],
  controllers: [WishlistController],
  providers: [
    WishlistService,
    JwtStrategy,
    {
      provide: 'APP_GUARD',
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}
