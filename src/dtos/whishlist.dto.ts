import { IsNotEmpty, IsString } from 'class-validator';

export class WishlistDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
}
