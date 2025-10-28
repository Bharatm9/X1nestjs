import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class VideosService {
  constructor(private prisma: PrismaService) {}

  async findByVehicle(vehicleId: number) {
    return this.prisma.video.findMany({
      where: { vehicleId },
      orderBy: { id: "asc" },
    });
  }
}
