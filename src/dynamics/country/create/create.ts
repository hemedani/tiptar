import { collections, ICountry } from "../../../schemas";
import { checkValidation, Context, throwError } from "../../../utils";
import { getCountry } from "../shared";
import { checkCreateCountry, ICreateCountryDetails } from "./create.type";

type CreateCountryFn = (
  details: ICreateCountryDetails,
  context: Context,
) => Promise<Partial<ICountry>>;

/**
 * @function
 * Represent createCountry (insert country to db)
 * @param details
 * @param context
 */
export const createCountryFn: CreateCountryFn = async (details, context) => {
  // !context ? emptyTokenError() : null;

  /**check user is authenticated */
  // const user = await isAuthFn(context.token!);

  /**if user was authenticated,check the user role */
  // user ? await checkRoleFn(user, ["Admin", "Normal"]) : notFoundError("User");
  /** check whether the details(input) is right or not*/
  checkValidation(checkCreateCountry, { details });
  const {
    set: { name, enName, geometries, countryCode },
    get,
  } = details;
  const newCountry = {
    name: name,
    enName: enName,
    countryCode,
    geometries: geometries
      ? { type: "Polygon", coordinates: geometries }
      : undefined,
  } as ICountry;
  // TODO: check the uniqueNess of country info
  const createdCountry = await collections.country.insertOne(newCountry);
  return createdCountry
    ? getCountry({ _id: createdCountry.insertedId, get })
    : throwError("a problem accurate during create country");
};
