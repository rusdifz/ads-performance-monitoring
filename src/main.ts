import { NestFactory, Reflector } from '@nestjs/core';
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { useContainer } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import {
  CommonHeaderGuard,
  ResponseErrorInterceptor,
  ResponseSuccessInterceptor,
} from './middlewares';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      validateCustomDecorators: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalInterceptors(new ResponseSuccessInterceptor());
  app.useGlobalFilters(new ResponseErrorInterceptor());

  app.useGlobalGuards(new CommonHeaderGuard());

  app.setGlobalPrefix('api');

  // build docs, do not forget to change description
  const config = new DocumentBuilder()
    .setTitle('API Ads Performance')
    .setDescription(
      `API Ads Performance Monitoring System <br><br>
        **Base URL** <br><br>
        **Development** <br>http://localhost:${process.env.PORT}/api <br><br>
      `,
    )
    .setVersion('1.0')
    .addServer(`http://localhost:${process.env.PORT}/api`, 'Localhost')

    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
