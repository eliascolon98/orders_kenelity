// Libraries
import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { constants } from './commons';

// Set swagger configuration
export const setSwaggerConfig = (app: INestApplication) => {
  // Set name
  const config = new DocumentBuilder()
    .setTitle(`${constants.APP_NAME} API ORDERS`)
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(
    `api/${constants.APP_NAME}/docs`.toLowerCase(),
    app,
    document,
  );
};
