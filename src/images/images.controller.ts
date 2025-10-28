import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { ImagesService } from "./images.service";

@Controller("api/images")
export class ImagesController {
  constructor(private svc: ImagesService) {}

  @Get("vehicle/:vehicleId")
  async byVehicle(@Param("vehicleId", ParseIntPipe) vehicleId: number) {
    return this.svc.findByVehicle(vehicleId);
  }
}
