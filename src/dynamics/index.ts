import FastestValidator, { ValidationError } from "fastest-validator";
import { Context, Doits, DynamicModels, throwError } from "../utils";
import { CountryDoits, countryFns } from "./country";

const v = new FastestValidator();
const check = v.compile({
  model: {
    type: "enum",
    values: [
      "Country",
    ],
  },
});

export const dynamicFns = (
  model: DynamicModels,
  doit: Doits,
  details: any,
  context: Context,
) => {
  const checkModel = check({ model });
  return checkModel === true
    ? {
      ["Country"]: async () =>
        await countryFns(doit as CountryDoits, details, context),
    }[model]()
    : throwError((checkModel as ValidationError[])[0].message);
};

export * from "./country";
