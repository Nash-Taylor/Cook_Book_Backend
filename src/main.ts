import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3001',
    credentials: true
  });
  
  // Add cookie-parser middleware
  app.use(cookieParser());
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
