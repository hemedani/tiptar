import FastestValidator, { ValidationError } from "fastest-validator";
import { ICountry } from "../../schemas";
import { throwError } from "../../utils";
import { createCountryFn } from "./create";

const v = new FastestValidator();
const check = v.compile({
  doit: {
    type: "enum",
    values: [
      "createCountry",
    ],
  },
});

export type CountryDoits = "createCountry";

type countryFns = (doit: CountryDoits, details: any, context: any) => any;

export const countryFns: countryFns = (doit, details, context) => {
  const checkDoit = check({ doit });
  return checkDoit === true
    ? {
      ["createCountry"]: async () => await createCountryFn(details, context),
    }[doit]()
    : throwError((checkDoit as ValidationError[])[0].message!);
};
