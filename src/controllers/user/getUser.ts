import { Request, Response } from "express";
import { UserModel } from "../../schemas";

export const getUser = async (req: Request, res: Response) => {
  try {
    const params = req.params;
    const user = await UserModel.findOne({ _id: params.id });
    res.send({ user });
  } catch (e) {
    res.statusCode = 501;
    res.send("can not found anything");
  }
};
