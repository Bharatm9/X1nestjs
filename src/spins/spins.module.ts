import { Module } from "@nestjs/common";
import { SpinsController } from "./spins.controller";
import { SpinsService } from "./spins.service";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [SpinsController],
  providers: [SpinsService],
})
export class SpinsModule {}
