import { ObjectId } from "mongodb";
import { collections, ICountry, RCountry } from "../../../schemas";
import { makeProjections, throwError } from "../../../utils";

type GetCountryInput = { _id: ObjectId; get: RCountry };

type GetCountry = ({ _id, get }: GetCountryInput) => Promise<Partial<ICountry>>;

/**
 * Represent getCountryFn
 * @param param0
 * param is include _id , get
 * get for specify what user want
 */
export const getCountry: GetCountry = async ({ _id, get }) => {
  const projection = makeProjections(get, [], []);
  let foundedDocument = await collections.country.findOne({ _id }, {
    projection,
  });
  !foundedDocument && throwError("can not find country");

  // foundedDocument = (
  //   await makeLookup<ICountry, IState, PuState>(
  //     [foundedDocument!],
  //     getStates,
  //     "states",
  //     get.states
  //   )
  // )[0];

  return foundedDocument!;
};
