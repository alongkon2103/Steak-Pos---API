import type { Order, CreateOrderInput, UpdateOrderInput } from "../types/order.model";
import { db } from "../index";



export const insertOrder = (input: CreateOrderInput) => {
  const query = db.prepare(`
    INSERT INTO Orders (tableId, total, status, openedAt)
    VALUES (?, 0, 'OPEN', datetime('now'))
  `);

  return query.run(input.tableId);
};


export const getAllOrders = (): Order[] => {
  const query = db.query<Order,[]>(`SELECT * FROM Orders ORDER BY openedAt DESC`);

  return query.all();
};


export const getOrderById = (id: number): Order | undefined => {
  const query = db.query<Order, number>(`SELECT * FROM Orders WHERE id = ?`);

  return query.get(id) ?? undefined;
};


export const updateOrder = (id: number, input: UpdateOrderInput) => {
  const query = db.query(`
    UPDATE Orders
    SET
      tableId = COALESCE(?, tableId),
      status  = COALESCE(?, status)
    WHERE id = ?
  `);

  return query.run(
    input.tableId ?? null,
    input.status ?? null,
    id
  );
};

export const closeOrder = (id: number, total: number) => {
  const query = db.query(`
    UPDATE Orders
    SET
      total = ?,
      status = 'PAID',
      closedAt = datetime('now')
    WHERE id = ?
  `);

  return query.run(total, id);
};


export const deleteOrder = (id: number) => {
  const query = db.query(`
    DELETE FROM Orders WHERE id = ?
  `);

  return query.run(id);
};
