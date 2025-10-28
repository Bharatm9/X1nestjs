// import { Injectable } from "@nestjs/common";
// import { PrismaService } from "../prisma/prisma.service";
// import { $Enums } from "@prisma/client";

// export type VehicleListItem = {
//   id: number;
//   rooftop_id: number | null;
//   make: string | null;
//   model: string | null;
//   year: number | null;
//   veh_listing_type: string | null;
//   trim?: string | null;
//   body_type?: string | null;
//   ext_color?: string | null;
// };

// export type VehicleDetail = VehicleListItem & {
//   engine?: string | null;
//   miles?: string | null;
//   status?: string | null;
//   videos?: any[];
//   spins?: any[];
//   images?: any[];
//   rooftop?: any | null;
// };

// @Injectable()
// export class VehiclesService {
//   constructor(private prisma: PrismaService) {}

//   async findAll(limit = 20): Promise<VehicleListItem[]> {
//     const rows = await this.prisma.vehicle.findMany({
//       take: limit,
//       orderBy: { id: "asc" },
//       select: {
//         id: true,
//         rooftopId: true,
//         make: true,
//         model: true,
//         year: true,
//         vehListingType: true,
//         trim: true,
//         bodyType: true,
//         extColor: true,
//       },
//     });

//     return rows.map((r) => ({
//       id: r.id,
//       rooftop_id: r.rooftopId ?? null,
//       make: r.make ?? null,
//       model: r.model ?? null,
//       year: r.year ?? null,
//       veh_listing_type: r.vehListingType ? String(r.vehListingType) : null,
//       trim: r.trim ?? null,
//       body_type: r.bodyType ?? null,
//       ext_color: r.extColor ?? null,
//     }));
//   }

//   async findOne(id: number): Promise<VehicleDetail | null> {
//     const r = await this.prisma.vehicle.findUnique({
//       where: { id },
//       include: {
//         videos: true,
//         spins: true,
//         images: true,
//         rooftop: true,
//       },
//     });
//     if (!r) return null;

//     return {
//       id: r.id,
//       rooftop_id: r.rooftopId ?? null,
//       make: r.make ?? null,
//       model: r.model ?? null,
//       year: r.year ?? null,
//       veh_listing_type: r.vehListingType ? String(r.vehListingType) : null,
//       trim: r.trim ?? null,
//       body_type: r.bodyType ?? null,
//       ext_color: r.extColor ?? null,
//       engine: r.engine ?? null,
//       miles: r.miles ?? null,
//       status: r.status ?? null,
//       videos: r.videos ?? [],
//       spins: r.spins ?? [],
//       images: r.images ?? [],
//       rooftop: r.rooftop ? {
//         id: r.rooftop.id,
//         name: r.rooftop.name,
//         city: r.rooftop.city,
//         state: r.rooftop.state,
//       } : null,
//     };
//   }
// }
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { UpdateVehicleIdDto } from './dto/update-veh.dto';
import { $Enums } from '@prisma/client';


export type VehicleListItem = {
  id: number;
  rooftop_id: number | null;
  make: string | null;
  model: string | null;
  year: number | null;
  veh_listing_type: string | null;
  trim?: string | null;
  body_type?: string | null;
  ext_color?: string | null;
};

export type VehicleDetail = VehicleListItem & {
  engine?: string | null;
  miles?: string | null;
  status?: string | null;
  videos?: any[];
  spins?: any[];
  images?: any[];
  rooftop?: any | null;
};

export class VehicleFilterDto {
  filters?: Record<string, any>;
  visibleCols?: string[];
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
  currentPage?: number;
}


@Injectable()
export class VehiclesService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll(limit = 5000, offset = 0): Promise<VehicleListItem[]> {
    const rows = await this.prisma.vehicle.findMany({
      skip: offset,
      take: limit,
      orderBy: { id: 'asc' },
      select: {
        id: true,
        rooftopId: true,
        make: true,
        model: true,
        year: true,
        vehListingType: true,
        trim: true,
        bodyType: true,
        extColor: true,
        images: {
          select: {
            imageUrl: true,
          },
        },
      },
      where: {
        deletedAt: null,
      },
    });

    return rows.map((r) => ({
      id: r.id,
      rooftop_id: r.rooftopId ?? null,
      make: r.make ?? null,
      model: r.model ?? null,
      year: r.year ?? null,
      veh_listing_type: r.vehListingType ? String(r.vehListingType) : null,
      trim: r.trim ?? null,
      body_type: r.bodyType ?? null,
      ext_color: r.extColor ?? null,
      image_urls: r.images.map((img) => img.imageUrl) ?? null,
    }));
  }

  // async findAllLatest(limit = 5000, offset = 0): Promise<VehicleListItem[]> {
  //   const rows = await this.prisma.vehicle.findMany({
  //     skip: offset,
  //     take: limit,
  //     orderBy: { id: 'asc' },
  //     select: {
  //       id: true,
  //       rooftopId: true,
  //       make: true,
  //       model: true,
  //       year: true,
  //       vehListingType: true,
  //       trim: true,
  //       bodyType: true,
  //       extColor: true,
  //     },
  //     where: {
  //       deletedAt: null,
  //     },
  //   });

  //   return rows.map((r) => ({
  //     id: r.id,
  //     rooftop_id: r.rooftopId ?? null,
  //     make: r.make ?? null,
  //     model: r.model ?? null,
  //     year: r.year ?? null,
  //     veh_listing_type: r.vehListingType ? String(r.vehListingType) : null,
  //     trim: r.trim ?? null,
  //     body_type: r.bodyType ?? null,
  //     ext_color: r.extColor ?? null,
  //   }));
  // }
  /*
    async findAllLatest(params: {
      filters?: any;
      visibleCols?: string[];
      sortColumn?: string;
      sortDirection?: 'asc' | 'desc';
      currentPage?: number;
    }): Promise<any[]> {
      const {
        filters = {},
        visibleCols = [],
        sortColumn = 'id',
        sortDirection = 'asc',
        currentPage = 1,
      } = params;
  
      const pageSize = 5000;
      const skip = (currentPage - 1) * pageSize;
  
      const fieldMap: Record<string, string> = {
        body_type: 'bodyType',
        ext_color: 'extColor',
        veh_listing_type: 'vehListingType',
      };
  
      const where: any = { deletedAt: null };
  
      // Apply filters safely
      for (const key of Object.keys(filters)) {
        const prismaKey = fieldMap[key] || key;
        const filter = filters[key];
  
        // Only apply filter if it has meaningful values
        if (filter.values && filter.values.length > 0) {
          where[prismaKey] = { in: filter.values };
        }
  
        if (filter.equals !== undefined && filter.equals !== null) {
          where[prismaKey] = filter.equals;
        }
  
        if (
          (filter.greaterThan !== undefined && filter.greaterThan !== null) ||
          (filter.lessThan !== undefined && filter.lessThan !== null)
        ) {
          where[prismaKey] = {};
          if (filter.greaterThan !== undefined) where[prismaKey].gt = filter.greaterThan;
          if (filter.lessThan !== undefined) where[prismaKey].lt = filter.lessThan;
        }
      }
  
      // Map visibleCols for select
      const select = visibleCols.length
        ? visibleCols.reduce((acc, col) => {
          const prismaCol = fieldMap[col] || col;
          acc[prismaCol] = true;
          return acc;
        }, {} as Record<string, boolean>)
        : undefined;
  
      const allowedColumns = [
        'id', 'rooftopId', 'make', 'model', 'year', 'vehListingType', 'trim', 'bodyType', 'extColor',
      ];
      const orderByColumn = allowedColumns.includes(fieldMap[sortColumn] || sortColumn)
        ? fieldMap[sortColumn] || sortColumn
        : 'id';
  
      // console.log('Where object:', where);
      // console.log('Select object:', select);
  
      const rows = await this.prisma.vehicle.findMany({
        skip,
        take: pageSize,
        where,
        orderBy: { [orderByColumn]: sortDirection },
        select,
      });
  
      return rows.map((r) =>
        Object.keys(r).reduce((acc, col) => {
          acc[col] = r[col] ?? null;
          return acc;
        }, {} as Record<string, any>),
      );
    }
  */

  // async findAllLatest(params: {
  //   filters?: {
  //     condition?: 'AND' | 'OR';
  //     rules: Array<{
  //       field: string;
  //       operator: string;
  //       value: any;
  //     }>;
  //   };
  //   visibleCols?: string[];
  //   sortColumn?: string;
  //   sortDirection?: 'asc' | 'desc';
  //   currentPage?: number;
  // }): Promise<any[]> {
  //   const {
  //     filters = { rules: [] },
  //     visibleCols = [],
  //     sortColumn = 'id',
  //     sortDirection = 'asc',
  //     currentPage = 1,
  //   } = params;

  //   const pageSize = 5000;
  //   const skip = (currentPage - 1) * pageSize;

  //   const fieldMap: Record<string, string> = {
  //     body_type: 'bodyType',
  //     ext_color: 'extColor',
  //     veh_listing_type: 'vehListingType',
  //     veh_listcontainsg_type: 'vehListingType',
  //   };

  //   const where: any = { deletedAt: null };

  //   if (filters.rules && filters.rules.length > 0) {
  //     where.AND = filters.rules.filter(rule => rule.value !== null && rule.value !== undefined &&
  //       (Array.isArray(rule.value) ? rule.value.length > 0 : true)).map(rule => {
  //         const prismaField = fieldMap[rule.field] || rule.field;

  //         switch (rule.operator.toLowerCase()) {
  //           case 'contains':
  //             if (Array.isArray(rule.value) && rule.value.length > 0) {
  //               return { [prismaField]: { in: rule.value } };
  //             }
  //             break;

  //           case '=':
  //           case 'equals':
  //             return { [prismaField]: rule.value };

  //           case '>':
  //           case 'greaterthan':
  //             return { [prismaField]: { gt: rule.value } };

  //           case '<':
  //           case 'lessthan':
  //             return { [prismaField]: { lt: rule.value } };

  //           case '>=':
  //           case 'greaterthanequal':
  //             return { [prismaField]: { gte: rule.value } };

  //           case '<=':
  //           case 'lessthanequal':
  //             return { [prismaField]: { lte: rule.value } };

  //           case 'in':
  //             if (Array.isArray(rule.value) && rule.value.length > 0) {
  //               return { [prismaField]: { in: rule.value } };
  //             }
  //             break;

  //           case 'notin':
  //             if (Array.isArray(rule.value) && rule.value.length > 0) {
  //               return { [prismaField]: { notIn: rule.value } };
  //             }
  //             break;

  //           case 'isnull':
  //           case 'is null':
  //             return { [prismaField]: null };

  //           case 'notnull':
  //           case 'is not null':
  //             return { [prismaField]: { not: null } };

  //           default:
  //             return { [prismaField]: rule.value };
  //         }
  //         return null; // Skip invalid rules
  //       })
  //       .filter(Boolean); // Remove null entries
  //   }

  //   const select = visibleCols.length ? visibleCols.reduce((acc, col) => {
  //     const prismaCol = fieldMap[col] || col;
  //     acc[prismaCol] = true;
  //     return acc;
  //   }, {} as Record<string, boolean>) : undefined;

  //   const allowedColumns = ['id', 'rooftopId', 'make', 'model', 'year', 'vehListingType', 'trim', 'bodyType', 'extColor',];
  //   const orderByColumn = allowedColumns.includes(fieldMap[sortColumn] || sortColumn) ? fieldMap[sortColumn] || sortColumn : 'id';
  //   console.log(JSON.stringify(where));

  //   const rows = await this.prisma.vehicle.findMany({
  //     skip,
  //     take: pageSize,
  //     where,
  //     orderBy: { [orderByColumn]: sortDirection },
  //     select,
  //   });

  //   return rows.map((r) =>
  //     Object.keys(r).reduce((acc, col) => {
  //       acc[col] = r[col] ?? null;
  //       return acc;
  //     }, {} as Record<string, any>),
  //   );
  // }

  async findAllLatest(params: {
    filters?: {
      condition?: 'AND' | 'OR';
      rules: Array<{
        field?: string;
        operator?: string;
        value?: any;
        condition?: 'AND' | 'OR';
        rules?: any[];
      }>;
    };
    visibleCols?: string[];
    sortColumn?: string;
    sortDirection?: 'asc' | 'desc';
    currentPage?: number;
  }): Promise<any[]> {
    const {
      filters = { rules: [] },
      visibleCols = [],
      sortColumn = 'id',
      sortDirection = 'asc',
      currentPage = 1,
    } = params;

    const pageSize = 5000;
    const skip = (currentPage - 1) * pageSize;

    const fieldMap: Record<string, string> = {
      body_type: 'bodyType',
      ext_color: 'extColor',
      veh_listing_type: 'vehListingType',
      veh_listcontainsg_type: 'vehListingType',
    };

    // Recursive function to build nested conditions
    const buildConditions = (filterGroup: any): any => {
      const condition = filterGroup.condition === 'OR' ? 'OR' : 'AND';
      return {
        [condition]: filterGroup.rules
          .filter(rule =>
            rule.value !== null && rule.value !== undefined &&
            (Array.isArray(rule.value) ? rule.value.length > 0 : true) || rule.rules).map(rule => {
              if (rule.rules) {
                return buildConditions(rule);
              }

              const prismaField = fieldMap[rule.field!] || rule.field;

              switch ((rule.operator || '').toLowerCase()) {
                case 'contains':
                  return Array.isArray(rule.value) ? { [prismaField]: { in: rule.value } } : { [prismaField]: { contains: rule.value } };

                case '=':
                case 'equals':
                  return { [prismaField]: rule.value };

                case '>':
                case 'greaterthan':
                  return { [prismaField]: { gt: rule.value } };

                case '<':
                case 'lessthan':
                  return { [prismaField]: { lt: rule.value } };

                case '>=':
                case 'greaterthanequal':
                  return { [prismaField]: { gte: rule.value } };

                case '<=':
                case 'lessthanequal':
                  return { [prismaField]: { lte: rule.value } };

                case 'in':
                  return Array.isArray(rule.value) ? { [prismaField]: { in: rule.value } } : null;

                case 'notin':
                  return Array.isArray(rule.value) ? { [prismaField]: { notIn: rule.value } } : null;

                case 'isnull':
                case 'is null':
                  return { [prismaField]: null };

                case 'notnull':
                case 'is not null':
                  return { [prismaField]: { not: null } };

                default:
                  return { [prismaField]: rule.value };
              }
            })
          .filter(Boolean),
      };
    };

    const where: any = { deletedAt: null };
    if (filters.rules?.length) {
      Object.assign(where, buildConditions(filters));
    }

    const select = visibleCols.length
      ? visibleCols.reduce((acc, col) => {
        const prismaCol = fieldMap[col] || col;
        acc[prismaCol] = true;
        return acc;
      }, {} as Record<string, boolean>)
      : undefined;

    const allowedColumns = [
      'id', 'rooftopId', 'make', 'model', 'year', 'vehListingType', 'trim', 'bodyType', 'extColor',
    ];
    const orderByColumn = allowedColumns.includes(fieldMap[sortColumn] || sortColumn)
      ? fieldMap[sortColumn] || sortColumn
      : 'id';

    console.log(JSON.stringify(where, null, 2));

    const rows = await this.prisma.vehicle.findMany({
      skip,
      take: pageSize,
      where,
      orderBy: { [orderByColumn]: sortDirection },
      select,
    });

    return rows.map(r =>
      Object.keys(r).reduce((acc, col) => {
        acc[col] = r[col] ?? null;
        return acc;
      }, {} as Record<string, any>),
    );
  }

  async VehicleupdateWithId(id: number, data: UpdateVehicleIdDto): Promise<VehicleListItem> {
    const updated = await this.prisma.vehicle.update({
      where: { id },
      data: {
        rooftopId: data.rooftop_id,
        make: data.make,
        model: data.model,
        year: data.year ? Number(data.year) : null,
        vehListingType: data.veh_listing_type ? (data.veh_listing_type as any) : undefined,
        trim: data.trim,
        bodyType: data.body_type,
        extColor: data.ext_color,
      },
      select: {
        id: true,
        rooftopId: true,
        make: true,
        model: true,
        year: true,
        vehListingType: true,
        trim: true,
        bodyType: true,
        extColor: true,
      },
    });

    return {
      id: updated.id,
      rooftop_id: updated.rooftopId,
      make: updated.make,
      model: updated.model,
      year: updated.year,
      veh_listing_type: updated.vehListingType,
      trim: updated.trim,
      body_type: updated.bodyType,
      ext_color: updated.extColor,
    };
  }
  async findOne(id: number): Promise<VehicleDetail | null> {
    const r = await this.prisma.vehicle.findUnique({
      where: { id },
      include: {
        videos: true,
        spins: true,
        images: true,
        rooftop: true,
      },
    });
    if (!r || r.deletedAt) return null;

    return {
      id: r.id,
      rooftop_id: r.rooftopId ?? null,
      make: r.make ?? null,
      model: r.model ?? null,
      year: r.year ?? null,
      veh_listing_type: r.vehListingType ? String(r.vehListingType) : null,
      trim: r.trim ?? null,
      body_type: r.bodyType ?? null,
      ext_color: r.extColor ?? null,
      engine: r.engine ?? null,
      miles: r.miles ?? null,
      status: r.status ?? null,
      videos: r.videos ?? [],
      spins: r.spins ?? [],
      images: r.images ?? [],
      rooftop: r.rooftop
        ? {
          id: r.rooftop.id,
          name: r.rooftop.name,
          city: r.rooftop.city,
          state: r.rooftop.state,
        }
        : null,
    };
  }

  // -------------------------
  // Create
  // -------------------------
  async create(dto: CreateVehicleDto) {
    const data: any = {};

    if (dto.rooftop_id !== undefined) data.rooftopId = dto.rooftop_id;
    if (dto.make !== undefined) data.make = dto.make;
    if (dto.model !== undefined) data.model = dto.model;
    if (dto.year !== undefined) data.year = dto.year;
    if (dto.veh_listing_type !== undefined) {
      // Accept string enum; Prisma expects enum value; using $Enums works reliably
      data.vehListingType = dto.veh_listing_type as unknown as $Enums.VehListingType;
    }
    if (dto.trim !== undefined) data.trim = dto.trim;
    if (dto.body_type !== undefined) data.bodyType = dto.body_type;
    if (dto.ext_color !== undefined) data.extColor = dto.ext_color;
    if (dto.engine !== undefined) data.engine = dto.engine;
    if (dto.miles !== undefined) data.miles = dto.miles;
    if (dto.status !== undefined) data.status = dto.status;

    const created = await this.prisma.vehicle.create({ data });
    // return a mapped object consistent with list/detail shapes
    return this.findOne(created.id);
  }

  // -------------------------
  // Update (partial)
  // -------------------------
  async update(id: number, dto: UpdateVehicleDto) {
    const existing = await this.prisma.vehicle.findUnique({ where: { id } });
    if (!existing || existing.deletedAt) {
      throw new NotFoundException('Vehicle not found');
    }

    const data: any = {};

    if (dto.rooftop_id !== undefined) data.rooftopId = dto.rooftop_id;
    if (dto.make !== undefined) data.make = dto.make;
    if (dto.model !== undefined) data.model = dto.model;
    if (dto.year !== undefined) data.year = dto.year;
    if (dto.veh_listing_type !== undefined) {
      data.vehListingType = dto.veh_listing_type as unknown as $Enums.VehListingType;
    }
    if (dto.trim !== undefined) data.trim = dto.trim;
    if (dto.body_type !== undefined) data.bodyType = dto.body_type;
    if (dto.ext_color !== undefined) data.extColor = dto.ext_color;
    if (dto.engine !== undefined) data.engine = dto.engine;
    if (dto.miles !== undefined) data.miles = dto.miles;
    if (dto.status !== undefined) data.status = dto.status;

    await this.prisma.vehicle.update({
      where: { id },
      data,
    });

    return this.findOne(id);
  }

  // -------------------------
  // Remove (soft-delete)
  // -------------------------
  async remove(id: number) {
    const existing = await this.prisma.vehicle.findUnique({ where: { id } });
    if (!existing || existing.deletedAt) {
      throw new NotFoundException('Vehicle not found');
    }

    await this.prisma.vehicle.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return { status: 'ok', message: 'Vehicle soft-deleted', id };
  }
}