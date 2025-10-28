import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ImagesService {
  constructor(private prisma: PrismaService) {}

  async findByVehicle(vehicleId: number) {
    return this.prisma.image.findMany({
      where: { vehicleId },
      orderBy: { id: "asc" },
    });
  }
}
