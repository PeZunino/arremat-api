import { Type } from 'class-transformer';

import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsInt,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export enum AuctionCategory {
  Car = 'Car',
  Motorcycle = 'Motorcycle',
  Default = 'Default',
}

class AuctionRoundDTO {
  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsString()
  value: string;
}

class LegalDTO {
  @IsString()
  caseNumber: string;

  @IsString()
  plaintiff: string;

  @IsString()
  defendant: string;
}

class VehicleDetailDTO {
  @IsOptional() @IsString() brand?: string;
  @IsOptional() @IsString() model?: string;
  @IsOptional() @IsString() yearManufacture?: string;
  @IsOptional() @IsString() yearModel?: string;
  @IsOptional() @IsString() uf?: string;
  @IsOptional() @IsString() plate?: string;
  @IsOptional() @IsString() chassis?: string;
  @IsOptional() @IsString() renavam?: string;
  @IsOptional() @IsString() engineNumber?: string;

  @IsOptional() @IsString() mileage?: string;
  @IsOptional() @IsString() fuel?: string;
  @IsOptional() @IsString() color?: string;
  @IsOptional() @IsString() transmission?: string;
  @IsOptional() @IsInt() doors?: number;
  @IsOptional() @IsBoolean() armored?: boolean;

  @IsOptional() @IsString() engine?: string;
  @IsOptional() @IsString() gearbox?: string;
  @IsOptional() @IsString() steering?: string;
  @IsOptional() @IsString() paint?: string;
  @IsOptional() @IsString() bodywork?: string;
  @IsOptional() @IsString() upholstery?: string;
  @IsOptional() @IsString() tires?: string;
  @IsOptional() @IsString() electrical?: string;
  @IsOptional() @IsString() mechanics?: string;
  @IsOptional() @IsString() conservationState?: string;
  @IsOptional() @IsBoolean() working?: boolean;
  @IsOptional() @IsObject() accessories?: Record<string, string>;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsString() inspectionAddress?: string;
}

class PropertyDetailDTO {
  @IsOptional() @IsString() type?: string;
  @IsOptional() @IsString() area?: string;
  @IsOptional() @IsString() privatArea?: string;
  @IsOptional() @IsString() landArea?: string;
  @IsOptional() @IsInt() bedrooms?: number;
  @IsOptional() @IsInt() bathrooms?: number;
  @IsOptional() @IsInt() parkingSpots?: number;
  @IsOptional() @IsString() floor?: string;
  @IsOptional() @IsString() registry?: string;
  @IsOptional() @IsString() registration?: string;
  @IsOptional() @IsString() conservationState?: string;
  @IsOptional() @IsBoolean() occupied?: boolean;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsArray() @IsString({ each: true }) amenities?: string[];
}

export default class CreateAuctionDTO {
  @IsString()
  url: string;

  @IsString()
  title: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  seller: string;

  @IsString()
  auctioneer: string;

  @IsNumber()
  initialValue: number;

  @IsDate()
  @Type(() => Date)
  openDate: Date;

  @IsDate()
  @Type(() => Date)
  closeDate: Date;

  @IsNumber()
  lastBid: number;

  @IsEnum(AuctionCategory)
  category: AuctionCategory;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AuctionRoundDTO)
  rounds: AuctionRoundDTO[];

  @IsOptional()
  @ValidateNested()
  @Type(() => LegalDTO)
  legal?: LegalDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => VehicleDetailDTO)
  vehicleDetail?: VehicleDetailDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => PropertyDetailDTO)
  propertyDetail?: PropertyDetailDTO;
}
