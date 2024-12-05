import { DataSourceOptions } from "typeorm";
import { config } from "dotenv";

config();

export const databaseConfig = (): DataSourceOptions => ({
  type: "mongodb",
  host: process.env.MONGO_HOST || "localhost",
  port: parseInt(process.env.MONGO_PORT) || 27017,
  database: process.env.MONGO_DATABASE || "developer",
  useUnifiedTopology: true,
  entities: [__dirname + "/../modules/**/entities/*.entity{.ts,.js}"],
  synchronize: true, // just for development
  migrations: [__dirname + "/../migrations/**/*{.ts,.js}"],
  migrationsTableName: "migrations_typeorm",
});

export default databaseConfig();
