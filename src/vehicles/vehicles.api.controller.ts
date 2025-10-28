
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Patch,
  Param,
  ParseIntPipe,
  NotFoundException,
  HttpCode,
  HttpStatus,
  Query,
  UsePipes,
  ValidationPipe,
  // Res
} from '@nestjs/common';
// import type { Response } from 'express';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { UpdateVehicleIdDto } from './dto/update-veh.dto';
// import express from 'express';
// import * as protobuf from 'protobufjs';

@Controller('api/vehicles')
export class VehiclesApiController {
  constructor(private readonly svc: VehiclesService) { }

  // GET /api/vehicles?limit=1000&offset=0
  @Get()
  async list(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    const parsedLimit = Number(limit) || 5000;
    const parsedOffset = Number(offset) || 0;

    return this.svc.findAll(parsedLimit, parsedOffset);
  }

  // @Post('v1')
  // async listUpdate(@Body() body: any) {
  //   const {
  //     filters = {},
  //     visibleCols = [],
  //     sortColumn = 'id',
  //     sortDirection = 'asc',
  //     currentPage = 1, // default to 1 if not provided
  //   } = body;

  //   const rows = await this.svc.findAllLatest({
  //     filters,
  //     visibleCols,
  //     sortColumn,
  //     sortDirection,
  //     currentPage,
  //   });

  //   return {
  //     currentPage, 
  //     data: rows,
  //   };
  // }

  @Post('v1')
  async listUpdate(@Body() body: any) {
    const {
      filters = {},
      visibleCols = [],
      sortColumn = 'id',
      sortDirection = 'asc',
      currentPage = 1,
    } = body;

    const rows = await this.svc.findAllLatest({
      filters,
      visibleCols,
      sortColumn,
      sortDirection,
      currentPage,
    });

    return {
      currentPage,
      data: rows,
    };
  }

  @Put('v1/edit/:id')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, // converts string to number if possible
      forbidUnknownValues: true,
      transformOptions: { enableImplicitConversion: true }, // allows string "2025" → number 2025
    }),
  )
  async updateVehiclev1(
    @Param('id') id: string,
    @Body() payload: UpdateVehicleIdDto,
  ) {
    const vehicleId = Number(id);
    return this.svc.VehicleupdateWithId(vehicleId, payload);
  }

  @Put('edit/:id')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, // converts string to number if possible
      forbidUnknownValues: true,
      transformOptions: { enableImplicitConversion: true }, // allows string "2025" → number 2025
    }),
  )
  async updateVehicle(
    @Param('id') id: string,
    @Body() payload: UpdateVehicleIdDto,
  ) {
    const vehicleId = Number(id);
    return this.svc.VehicleupdateWithId(vehicleId, payload);
  }
  /*
    @Get('/protoBuffer')
    async listProto(
      @Query('limit') limitQuery: string,
      @Res() res: express.Response,
    ) {
      const limit = Number(limitQuery);
      const parsedLimit = Number.isInteger(limit) && limit > 0 ? limit : 20;
  
      const buffer = await this.svc.findAllProtoBuffer(parsedLimit);
  
      res.setHeader('Content-Type', 'application/x-protobuf');
      res.send(buffer);
    }
  
    @Get('/protoBuffer/stream')
    async listProtostream(
      @Query('limit') limitQuery: string,
      @Res() res: express.Response,
    ) {
      const limit = Number(limitQuery);
      const parsedLimit = Number.isInteger(limit) && limit > 0 ? limit : 1000;
  
      // Load protobuf schema once
      const root = await protobuf.load('src/proto/vehicles.proto');
      const Vehicle = root.lookupType('vehicle.Vehicle');
  
      // Set headers for binary response
      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader('Transfer-Encoding', 'chunked');
  
      // Create a readable stream of data directly from Prisma
      const stream = await this.svc.findAllProtoBufferWithStream(parsedLimit, Vehicle);
  
      // Pipe directly into the response
      stream.on('data', chunk => res.write(chunk));
      stream.on('end', () => res.end());
      stream.on('error', err => {
        console.error('Stream error:', err);
        if (!res.writableEnded) res.end();
      });
    }
  */


  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const v = await this.svc.findOne(id);
    if (!v) throw new NotFoundException('Vehicle not found');
    return v;
  }

  @Post()
  async create(@Body() dto: CreateVehicleDto) {
    const created = await this.svc.create(dto);
    return {
      status: 'ok',
      data: created,
    };
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateVehicleDto) {
    const updated = await this.svc.update(id, dto);
    return {
      status: 'ok',
      data: updated,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.svc.remove(id);
  }
}