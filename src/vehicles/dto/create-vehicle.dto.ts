import { IsString, IsOptional, IsInt, Min, Max, IsEnum } from 'class-validator';

export enum VehListingType {
  New = 'New',
  Used = 'Used',
}

const currentYear = new Date().getFullYear();

export class CreateVehicleDto {
  @IsOptional()
  @IsInt()
  rooftop_id?: number;

  @IsString()
  make!: string;

  @IsString()
  model!: string;

  @IsOptional()
  @IsInt()
  @Min(1900)
  @Max(currentYear + 1)
  year?: number;

  @IsOptional()
  @IsEnum(VehListingType)
  veh_listing_type?: VehListingType;

  @IsOptional()
  @IsString()
  trim?: string;

  @IsOptional()
  @IsString()
  body_type?: string;

  @IsOptional()
  @IsString()
  ext_color?: string;

  @IsOptional()
  @IsString()
  engine?: string;

  @IsOptional()
  @IsString()
  miles?: string;

  @IsOptional()
  @IsString()
  status?: string;

}