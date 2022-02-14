import { Request, Response } from "express";
import { UserModel } from "../../schemas";

export const addUser = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    const addedUser = new UserModel({
      name: body.name,
      email: body.email,
    });

    await addedUser.save();

    res.send({ user: addedUser });
  } catch (e) {
    res.statusCode = 501;
    res.send("can not found anything");
  }
};
