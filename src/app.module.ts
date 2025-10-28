import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { VehiclesModule } from './vehicles/vehicles.module';
import { SpinsModule } from './spins/spins.module';
import { ImagesModule } from './images/images.module';
import { VideosModule } from './videos/videos.module';
import { RooftopsModule } from './rooftops/rooftops.module';
import { PrismaModule } from './prisma/prisma.module';
import { AppService } from './app.service';


@Module({
  imports: [PrismaModule, VehiclesModule, SpinsModule, ImagesModule, VideosModule, RooftopsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
