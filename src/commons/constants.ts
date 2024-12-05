// Libraries
import { config } from 'dotenv';

// Dot env config
config();

export default {
  NODE_ENENVIRONMENTV: process.env.ENVIRONMENT || 'ENVIRONMENT',
  PORT: process.env.PORT || 3000,
  APP_NAME: process.env.APP_NAME || 'main',
  // DB CONFIG postgres default
  MONGO_HOST: process.env.MONGO_HOST || 'localhost',
  MONGO_PORT: Number(process.env.MONGO_PORT) || 27017,
  MONGO_DATABASE: process.env.MONGO_DATABASE || 'solicitudes_bd',
  MONGO_USER: process.env.MONGO_USER || 'admin',
  MONGO_PASSWORD: process.env.MONGO_PASSWORD || 'eliascolon98',

  // JWT CONFIG
  JWT_KEY: process.env.JWT_KEY || 'secret',
  JWT_EXPIRES: process.env.JWT_EXPIRES || '365d',
};
