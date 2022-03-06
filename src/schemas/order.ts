import { IUser, PuRelUser, userSelectable, UserSelectInp } from "./index";
import {
  Base,
  baseProjection,
  baseSelectableFields,
  checkRelation,
  decreaseIterate,
  fieldType,
  ObjectID,
  RBase,
  RType,
} from "./utils";

export enum OrderStatus {
  /**cancelled by store */
  Rejected = "REJECTED",
  Processing = "PROCESSING",
  Delivered = "DELIVERED",
  /**cancelled by user */
  Canceled = "CANCELED",
}

export enum PaymentStatus {
  Paid = "PAID",
  NotPaid = "NOTPAID",
}

export interface PuOrder extends Base {
  /**total price of all the ordered materials */
  totalPrice: number;
  /**totalQuantity of items ordered */
  totalQuantity: number;
  /**a confirmation code that send as a unique code to customer */
  confirmationNumber: number;
  /** Any discount applied (to an Order).*/
  discount: number;
  /** the description on the order */
  description: string;
  /**Code used to redeem a discount. */
  discountCode: string;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
}

export const puOrderProjection = (zero = false) => {
  const zeroOrOne = zero ? 0 : 1;
  return {
    ...baseProjection(zero),
    totalPrice: zeroOrOne,
    totalQuantity: zeroOrOne,
    confirmationNumber: zeroOrOne,
    discount: zeroOrOne,
    description: zeroOrOne,
    discountCode: zeroOrOne,
    PaymentStatus: zeroOrOne,
    OrderStatus: zeroOrOne,
  };
};

export interface RelOrder {
  user?: ObjectID | IUser;
}

export interface PuRelOrder extends PuOrder, RelOrder {}

export interface EmOrder {
  user: PuRelUser;
}

export interface InOrder {
  user: PuRelUser;
}

export interface OutOrder {
}

export interface IOrder extends PuOrder, EmOrder {}

export interface ROrder extends RBase {
  totalPrice: RType;
  confirmationNumber: RType;
  discount: RType;
  discountCode: RType;
  paymentStatus: RType;
  orderStatus: RType;
}

export type OrderInp = {
  user: number | UserSelectInp;
};

/**
 * @function
 * orderSelectable: return the fields of the schema and its relations that can be select from order schema
 * @param depth
 */
export const orderSelectable = (depth: number | OrderInp = 2): any => {
  const returnObj = {
    ...baseSelectableFields(),
    totalPrice: fieldType,
    confirmationNumber: fieldType,
    discount: fieldType,
    discountCode: fieldType,
    paymentStatus: fieldType,
    orderStatus: fieldType,
  };

  const numberDepth = (depth: number, pureObj: Record<string, any>) => {
    depth--;
    depth > -1 &&
      (pureObj = {
        ...pureObj,
        user: {
          type: "object",
          optional: true,
          props: userSelectable(depth),
        },

        wares: {
          type: "object",
          optional: true,
          props: {
            quantity: fieldType,
            description: fieldType,
            sumPrice: fieldType,
            selectedPreDesignRelations: fieldType,
            selectedPreDesign: fieldType,
            ware: {
              type: "object",
              optional: true,
              props: {
                _id: fieldType,
                isPromotion: fieldType,
                brand: fieldType,
                name: fieldType,
                description: fieldType,
                photos: fieldType,
              },
            },
          },
        },
      });

    return pureObj;
  };

  const objectDepth = (depth: any, pureObj: Record<string, any>) => {
    depth = decreaseIterate<OrderInp>(depth);

    checkRelation(depth, "user") &&
      (pureObj = {
        ...pureObj,
        user: {
          type: "object",
          optional: true,
          props: userSelectable(depth.user),
        },
      });

    return pureObj;
  };

  const completeObj = typeof depth === "number"
    ? numberDepth(depth, returnObj)
    : objectDepth(depth, returnObj);

  return completeObj;

  // return depth > 0
  //   ? {
  //       ...returnObj,

  //       ware: {
  //         type: "object",
  //         optional: true,
  //         props: wareSelectable(depth),
  //       },
  //       user: {
  //         type: "object",
  //         optional: true,
  //         props: userSelectable(depth),
  //       },
  //     }
  //   : returnObj;
};
