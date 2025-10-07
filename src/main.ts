import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Establecer un prefijo global para las rutas
  app.setGlobalPrefix('api');
  
  // Habilitar CORS
  app.enableCors({
    origin: '*',  // Permitir solicitudes desde cualquier origen
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  // Usar pipes globales para la validación de datos
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,  // Remover propiedades no deseadas
      forbidNonWhitelisted: true,  // Lanzar errores si se envían propiedades no permitidas
      transform: true,  // Transformar los datos de entrada a los tipos esperados
    }),
  );
  
  // Configuración de Swagger (sin autenticación)
  const config = new DocumentBuilder()
    .setTitle('Materias Service API')
    .setDescription('API para gestión de Materias, Tipos, Niveles y Prerequisitos')
    .setVersion('1.0')
    .addTag('materias')
    .addTag('tipos')
    .addTag('niveles')
    .addTag('prerequisitos')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // Iniciar la aplicación
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  await app.listen(port, '0.0.0.0');
  
  console.log(`🚀 Materias Service running on port ${port}`);
  console.log(`📚 Swagger docs available at http://localhost:${port}/docs`);
  console.log(`🔗 API base URL: http://localhost:${port}/api`);
}

bootstrap();