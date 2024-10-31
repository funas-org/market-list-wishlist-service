import { registerAs } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Wishlist } from 'models/wishlist.model';
import { Dialect } from 'sequelize';

// Isso é considerada como uma Factory Function
export default registerAs(
  'dbconfig.dev',
  (): SequelizeModuleOptions => ({
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
);
