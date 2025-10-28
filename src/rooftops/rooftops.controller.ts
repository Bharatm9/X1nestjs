import { Controller, Get, Put, Param, ParseIntPipe, NotFoundException, Body, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { RooftopsService } from "./rooftops.service";
import { CreateRooftopDto } from "./dto/create-rooftop.dto";

@Controller("api/rooftops")
export class RooftopsController {
  constructor(private readonly svc: RooftopsService) { }

  @Get()
  async list() {
    return this.svc.findAll();
  }

  @Post()
  async create(@Body() data: CreateRooftopDto) {
    return this.svc.create(data);
  }

  @Put(":id")
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, // converts string to number if possible
      forbidUnknownValues: true,
      transformOptions: { enableImplicitConversion: true }, 
    }),
  )
  async update(@Param("id") id: string, @Body() data: CreateRooftopDto) {
    return this.svc.update(+id, data);
  }


  @Get(":id")
  async getOne(@Param("id", ParseIntPipe) id: number) {
    const r = await this.svc.findOne(id);
    if (!r) throw new NotFoundException("Rooftop not found");
    return r;
  }
}
