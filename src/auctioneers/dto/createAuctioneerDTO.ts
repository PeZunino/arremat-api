import { IsString, IsArray } from 'class-validator';

export default class CreateAuctioneerDTO {
  @IsString()
  name: string;

  @IsArray()
  @IsString({ each: true })
  email: string[];

  @IsArray()
  @IsString({ each: true })
  phones: string[];

  @IsArray()
  @IsString({ each: true })
  url: string[];

  @IsArray()
  @IsString({ each: true })
  division: string[];
}
