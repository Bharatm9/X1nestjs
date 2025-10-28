import { Module } from "@nestjs/common";
import { VehiclesService } from "./vehicles.service";
import { VehiclesApiController } from "./vehicles.api.controller";
import { VehiclesViewController } from "./vehicles.view.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [VehiclesApiController, VehiclesViewController],
  providers: [VehiclesService],
})
export class VehiclesModule {}