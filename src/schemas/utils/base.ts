// import { Bson, ObjectId } from "../../../utils/deps.ts";
import { ObjectId } from "mongodb";

export type RType = 0 | 1;

export interface Base {
  _id: ObjectId;
  createdAt?: Date;
  updateAt?: Date;
}

export const baseProjection = (zero = false) => {
  const zeroOrOne = zero ? 0 : 1;
  return { _id: zeroOrOne, createdAt: zeroOrOne, updateAt: zeroOrOne };
};

export interface ObjectID {
  _id: ObjectId;
}
export interface RBase {
  _id?: RType;
  createdAt?: RType;
  updateAt?: RType;
  // version: number;
  // documnet?: any;
}
export const baseSelectableFields = () => ({
  _id: fieldType,
  createdAt: fieldType,
  updateAt: fieldType,
});

export const fieldType = { type: "enum", values: [0, 1], optional: true };
