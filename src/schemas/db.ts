import * as mongoDB from "mongodb";
import { ICity, ICountry, IUser } from "./index";
import { IState } from "./state";

export let collections: {
  country?: mongoDB.Collection<ICountry>;
  city?: mongoDB.Collection<ICity>;
  state?: mongoDB.Collection<IState>;
  user?: mongoDB.Collection<IUser>;
} = {};

export async function connectToDatabase() {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    "mongodb://127.0.0.1:27017/lesan",
  );

  await client.connect();

  const db = client.db("lesan");

  collections = {
    country: db.collection<ICountry>("countries"),
    city: db.collection<ICity>("city"),
    state: db.collection<IState>("state"),
    user: db.collection<IUser>("user"),
  };

  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${collections}`,
  );
}
