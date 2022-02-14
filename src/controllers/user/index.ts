import { Express } from "express";
import { addUser } from "./addUser";
import { getUser } from "./getUser";
import { getUsers } from "./getUsers";

export const userRoutes = (app: Express) => {
  app.get("/user/get/:id", getUser);
  app.get("/user/gets", getUsers);
  app.post("/user/add", addUser);
};
