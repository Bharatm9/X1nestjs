import { PartialType } from '@nestjs/mapped-types';
import { CreateVehicleDto } from './create-vehicle.dto';

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {
  vehListingType: string;
  bodyType: string;
  extColor: string;
  rooftopId: number;
}


export class VehicleFilterDto {
  filters?: Record<string, any>;
  visibleCols?: string[];
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
  currentPage?: number;
}
