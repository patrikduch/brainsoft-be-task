import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "patrikduch",
  password: "duch",
  database: "fastify-postgres-db",
  synchronize: false,
  logging: false,
  entities: ["build/entities/**/*.js"],
  migrations: ["build/migrations/**/*.js"],
  subscribers: [],
});
