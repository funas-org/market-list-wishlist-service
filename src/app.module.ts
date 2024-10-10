import { Module } from '@nestjs/common';
import { AppController } from './whishlist.controller';
import { AppService } from './whishlist.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
