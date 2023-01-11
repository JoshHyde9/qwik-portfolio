import { Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";

export type GuestBook = {
  id: string;
  username: string;
  comment: string;
  createdAt: string;
};

type Database = {
  GuestBook: GuestBook;
};

export const db = new Kysely<Database>({
  dialect: new PlanetScaleDialect({
    host: "aws.connect.psdb.cloud",
    username: import.meta.env.VITE_DATABASE_USERNAME,
    password: import.meta.env.VITE_DATABASE_PASSWORD,
  }),
});
