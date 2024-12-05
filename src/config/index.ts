import { databaseConfig } from "./database";
import { jwtConfig } from "./jwt";

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: databaseConfig(),
  jwt: jwtConfig(),
});
