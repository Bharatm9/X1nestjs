import { Controller, Get, Render } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('vehicles')
export class VehiclesViewController {
  constructor(private prisma: PrismaService) {}

  @Get('view')
  @Render('vehicles') 
  async viewVehicles() {
    const vehicles = await this.prisma.vehicle.findMany({
      take: 20,
    });
    return { vehicles };
  }
}
