import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateVehicleIdDto {
  @IsOptional()
  @IsInt()
  rooftop_id?: number | null;

  @IsOptional()
  @IsString()
  make?: string | null;

  @IsOptional()
  @IsString()
  model?: string | null;

  @IsInt({ message: 'Year must be a number' })
  @Min(1900, { message: 'Year must not be less than 1900' })
  @Max(new Date().getFullYear() + 1, { message: 'Year must not be greater than next year' })
  year: number;

  @IsOptional()
  @IsString()
  veh_listing_type?: string | null;

  @IsOptional()
  @IsString()
  trim?: string | null;

  @IsOptional()
  @IsString()
  body_type?: string | null;

  @IsOptional()
  @IsString()
  ext_color?: string | null;
}
