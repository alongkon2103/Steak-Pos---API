import { db } from "../index";
import { getOrderById } from "../db/order.db";
import { getFoodById } from "../db/food.db";
import { insertOrderItem } from "../db/orderItem.db";

export const createOrderItem = (orderId: number,foodId: number,quantity: number) => {
  return db.transaction(() => {
    const order = getOrderById(orderId);
    if (!order || order.status !== 'OPEN') {
      throw new Error("Order is not open");
    }

    const food = getFoodById(foodId);
    if (!food || food.isActive === false) {
      throw new Error("Food not available");
    }

    const result = insertOrderItem(
      orderId,
      foodId,
      food.name,
      food.price,
      quantity
    );

    return {
      orderItemId: Number(result.lastInsertRowid),
    };
  })();
};
