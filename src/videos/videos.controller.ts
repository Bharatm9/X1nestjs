import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { VideosService } from "./videos.service";

@Controller("api/videos")
export class VideosController {
  constructor(private svc: VideosService) {}

  @Get("vehicle/:vehicleId")
  async byVehicle(@Param("vehicleId", ParseIntPipe) vehicleId: number) {
    return this.svc.findByVehicle(vehicleId);
  }
}