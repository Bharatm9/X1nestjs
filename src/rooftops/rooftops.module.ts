import { Module } from "@nestjs/common";
import { RooftopsController } from "./rooftops.controller";
import { RooftopsService } from "./rooftops.service";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [RooftopsController],
  providers: [RooftopsService],
})
export class RooftopsModule {}
