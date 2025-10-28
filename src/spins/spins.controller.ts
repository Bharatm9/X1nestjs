import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { SpinsService } from "./spins.service";

@Controller("api/spins")
export class SpinsController {
  constructor(private svc: SpinsService) {}

  @Get("vehicle/:vehicleId")
  async byVehicle(@Param("vehicleId", ParseIntPipe) vehicleId: number) {
    return this.svc.findByVehicle(vehicleId);
  }
}