import { Kysely, type Generated } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";

type Database = {
  GuestBook: {
    id: string;
    username: string;
    comment: string;
    createdAt: Generated<Date>;
  };
};

export const db = new Kysely<Database>({
  dialect: new PlanetScaleDialect({
    host: "aws.connect.psdb.cloud",
    username: import.meta.env.VITE_DATABASE_USERNAME,
    password: import.meta.env.VITE_DATABASE_PASSWORD,
  }),
});
