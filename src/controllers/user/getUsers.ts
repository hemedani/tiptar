import { Request, Response } from "express";
import { UserModel } from "../../schemas";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    res.send({ users });
  } catch (e) {
    res.statusCode = 501;
    res.send("can not found anything");
  }
};
