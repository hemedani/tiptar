import FastestValidator, { ValidationError } from "fastest-validator";
import { IncomingMessage } from "http";
import { CountryDoits } from "../dynamics";
import { IUser } from "../schemas";
import { Context, context, throwError } from "./index";

export type StreamsModels = "File";
export type StaticModels = "BlogFirstPage" | "StoreHomePage" | "ShopPage";

export type DynamicModels = "User";

export type Doits = CountryDoits;

export interface Body {
  contents: "static" | "dynamic" | "streams";
  wants: {
    model: DynamicModels | StaticModels | StreamsModels;
    doit: Doits;
  };
  details: any;
  context: Context;
}

const decodeBody: (req: IncomingMessage) => Promise<Body> = async (req) => {
  // const { headers, method, url } = req;
  let body: Uint8Array[] = [];
  return new Promise((resolve, reject) => {
    req.on("error", (err: Error) => {
      return reject(err);
    }).on("data", (chunk: Uint8Array) => {
      body.push(chunk);
    }).on("end", async () => {
      try {
        const parsedBody = JSON.parse(Buffer.concat(body).toString()) as Body;
        return resolve(parsedBody);
      } catch (e) {
        return reject(e);
      }
    });
  });
};

const v = new FastestValidator();
const check = v.compile({
  contents: {
    type: "enum",
    values: ["static", "dynamic", "streams"],
  },
});

const checkBody = (body: Body) => {
  const isRight = check(body);
  return isRight === true
    ? isRight
    : throwError(
      `the error is here ${(isRight as ValidationError[])[0].message} but get ${
        (isRight as ValidationError[])[0].actual
      }`,
    );
};

export const parsBody = async (req: IncomingMessage) => {
  const { headers, method, url } = req;
  const parsedBody = await decodeBody(req);
  // const url = req.url.pathname;

  return method === "POST" && url === "/lesan" && checkBody(parsedBody)
    ? { ...parsedBody, context: context(req) }
    : throwError("you most send a post request to /lesan url");
};
