import { $Enums } from '@prisma/client';

export class VehicleDto {
  id: number;
  make: string;
  model: string;
  year: number;
  veh_listing_type: $Enums.VehListingType;
}
