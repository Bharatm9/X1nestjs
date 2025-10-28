import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class SpinsService {
  constructor(private prisma: PrismaService) {}

  async findByVehicle(vehicleId: number) {
    return this.prisma.spin360.findMany({
      where: { vehicleId },
      orderBy: { id: "asc" },
    });
  }
}