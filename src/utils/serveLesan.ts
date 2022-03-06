import { IncomingMessage, ServerResponse } from "http";
import { dynamicFns } from "../dynamics";
import { Body, DynamicModels, parsBody } from "./index";

export const serveLesan = async (req: IncomingMessage, res: ServerResponse) => {
  const response = async () => {
    const {
      contents,
      wants: { model, doit },
      details,
      context,
    } = (await parsBody(req)) as Body;

    return {
      ["dynamic"]: () =>
        dynamicFns(model as DynamicModels, doit, details, context),
      // ["static"]: () =>
      //   staticFns(model as StaticModels, doit, details, context),
      // ["streams"]: () =>
      //   streamsFns(model as StreamsModels, doit, details, context),
    }[contents]();
  };
  // it's chunk persist just for re-implementing cors
  // respondWith(new Response({
  //   ...corsRespond,
  //   body: JSON.stringify({
  //     success: true,
  //     body: await response(),
  //   }),
  //   status: 200,
  // }));

  res.statusCode = 200;

  return (res.end(JSON.stringify({ body: await response(), success: true })));
};
