import type { OrderItem } from "../types/orderItems.model";
import { db } from "../index";


export const insertOrderItem = (orderId: number,foodId: number, name: string,price: number,quantity: number) => {
  const query = db.prepare(`
    INSERT INTO OrderItems (orderId, foodId, name, price, quantity)
    VALUES (?, ?, ?, ?, ?)
  `);

  return query.run(orderId, foodId, name, price, quantity);
};

export const getOrderItemsByOrderId = (orderId: number): OrderItem[] => {
  const query = db.query<OrderItem, number>(
    `SELECT * FROM OrderItems WHERE orderId = ?`
  );

  return query.all(orderId);
};

export const updateOrderItemQuantity = (id: number, quantity: number) => {
  const query = db.prepare(`
    UPDATE OrderItems
    SET quantity = ?
    WHERE id = ?
  `);

  return query.run(quantity, id);
};

export const deleteOrderItem = (id: number) => {
  const query = db.prepare(`
    DELETE FROM OrderItems WHERE id = ?
  `);

  return query.run(id);
};
export const calculateOrderTotal = (orderId: number): number => {
  const query = db.query<{
    total: number;
  }, number>(`
    SELECT SUM(price * quantity) AS total
    FROM OrderItems
    WHERE orderId = ?
  `);

  const result = query.get(orderId);
  return result?.total ?? 0;
};
