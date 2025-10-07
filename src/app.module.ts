import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MateriaModule } from './materia/materia.module';
import { NivelModule } from './nivel/nivel.module';
import { TipoModule } from './tipo/tipo.module';
import { PrerequisitoModule } from './prerequisito/prerequisito.module';

@Module({
  imports: [
    // Configuración global de variables de entorno
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Configuración de TypeORM con PostgreSQL
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),

        // Configuración SSL para Render
        ssl:
          configService.get('DATABASE_SSL') === 'true'
            ? {
                rejectUnauthorized: false,
              }
            : false,

        // Auto-descubrimiento de entidades
        autoLoadEntities: true,

        // ⚠️ IMPORTANTE: false porque no queremos que NestJS modifique la BD compartida
        synchronize: false,

        // Ver queries en desarrollo
        logging: false ,

       
      }),
      inject: [ConfigService],
    }),

    MateriaModule,

    NivelModule,

    TipoModule,

    PrerequisitoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
