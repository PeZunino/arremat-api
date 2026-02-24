import { Type } from 'class-transformer';
import { Vehicle } from 'src/generated/prisma/client';

import {
  IsArray,
  IsDate,
  IsEnum,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

class AuctionRound {
  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsString()
  value: string;
}

class Legal {
  @IsString()
  caseNumber: string;

  @IsString()
  plaintiff: string;

  @IsString()
  defendant: string;
}

class AuctionDetail {
  @IsString()
  description: string;

  @IsArray()
  @IsString({ each: true })
  status: string[];
}

export default class CreateAuctionDTO {
  @IsString()
  url: string;

  @IsString()
  title: string;

  @IsString()
  city: string;

  @IsString()
  stat: string;

  @IsString()
  seller: string;

  @IsString()
  auctioneer: string;

  @IsNumber()
  initialValue: number;

  @IsDate()
  openDate: Date;

  @IsDate()
  closeDate: Date;

  @IsNumber()
  lastBid: number;

  @IsEnum(Vehicle)
  category: Vehicle;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AuctionRound)
  rounds: AuctionRound[];

  @ValidateNested()
  @Type(() => Legal)
  legal: Legal;

  @ValidateNested()
  @Type(() => AuctionDetail)
  details: AuctionDetail;
}
