// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { NestExpressApplication } from '@nestjs/platform-express';
// import { join } from 'path';
// import { PrismaService } from './prisma/prisma.service';

// async function bootstrap() {
//   const app = await NestFactory.create<NestExpressApplication>(AppModule);
//   let viewsPath = join(__dirname, '..', 'src', 'views');
//   app.setBaseViewsDir(viewsPath);
//   app.setViewEngine('ejs');
//   app.useStaticAssets(join(__dirname, '..', 'public'));

//   app.set('trust proxy', 1);
//   app.enableCors({ origin: true, credentials: true });

//   //app.setGlobalPrefix('api');

//   const prismaService = app.get(PrismaService);
//   if (prismaService && typeof prismaService['enableShutdownHooks'] === 'function') {    
//     await prismaService['enableShutdownHooks'](app);
//   }

//   const port = process.env.PORT ? Number(process.env.PORT) : 3000;
//   await app.listen(port);
// }
// bootstrap();
// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { PrismaService } from './prisma/prisma.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  let viewsPath = join(__dirname, '..', 'src', 'views');
  app.setBaseViewsDir(viewsPath);
  app.setViewEngine('ejs');
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.set('trust proxy', 1);
  app.enableCors({ origin: true, credentials: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));


  const prisma = app.get(PrismaService);
  await app.listen(process.env.PORT ? +process.env.PORT : 3000);
  console.log(`Listening on ${process.env.PORT ?? 3000}`);

  // Graceful shutdown handler
  const shutdown = async (signal?: string) => {
    try {
      console.log(`Received ${signal ?? 'shutdown'}, closing...`);
      // close Nest (will call onModuleDestroy on providers)
      await app.close();
      // ensure Prisma disconnected (in case onModuleDestroy didn't run)
      await prisma.$disconnect();
      console.log('Shutdown complete');
      // If running under pm2/systemd, do not call process.exit() unconditionally,
      // but here it's fine for a simple POC:
      process.exit(0);
    } catch (err) {
      console.error('Error during shutdown', err);
      process.exit(1);
    }
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));

  // optional: listen to beforeExit and attempt disconnect (safe)
  process.once('beforeExit', async () => {
    try {
      await prisma.$disconnect();
    } catch (e) {
      /* ignore */
    }
  });
}
bootstrap();