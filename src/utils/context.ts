import { IUser } from "../schemas";

export interface Context {
  token?: string;
  user?: IUser;
}

export const context = (req: IncomingMessage) => {
  return {};
};
