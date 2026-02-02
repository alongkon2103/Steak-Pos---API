import { db } from "../index";
import { checkAvalibleTableService } from "./table.service";
import { insertOrder,updateOrder,getOrderById,closeOrder} from "../db/order.db";
import {CreateOrderInput} from "../types/order.model"
import { getTableById, updateTableStatus } from "../db/table.db";
import { calculateOrderTotal } from "../db/orderItem.db";
export const createOrderService = (input: CreateOrderInput) => {
  const table = getTableById(input.tableId);

  if (!table) {
    throw new Error("Table not found");
  }

  if (table.status === 'OCCUPIED') {
    throw new Error("Table is already occupied");
  }

  return db.transaction(() => {
    const result = insertOrder({ tableId:input.tableId });
    updateTableStatus(input.tableId, 'OCCUPIED');
    return result;
  })();
};

export const moveOrderTableService = (orderId: number, newTableId: number) => {
  return db.transaction(() => {
    const order = getOrderById(orderId);
    if (!order) {
      throw new Error("Order not found");
    }

    const oldTableId = order.tableId;

    if (oldTableId === newTableId) {
      throw new Error("Cannot move to the same table");
    }

    const newTable = getTableById(newTableId);
    if (!newTable) {
      throw new Error("New table not found");
    }

    if (newTable.status === 'OCCUPIED') {
      throw new Error("Target table is occupied");
    }

    updateOrder(orderId, { tableId: newTableId });
    updateTableStatus(oldTableId, 'AVAILABLE');
    updateTableStatus(newTableId, 'OCCUPIED');

    return { success: true };
  })();
};


export const closeOrderService = (orderId: number) => {
  
  return db.transaction(() => {
    const order = getOrderById(orderId);
    if (!order || order.status !== 'OPEN') {
      throw new Error("Order invalid");
    }

    const total = calculateOrderTotal(orderId);
    closeOrder(orderId, total);
    updateTableStatus(order.tableId, 'AVAILABLE');

    return {
      orderId,
      total,
    };
  })();
};
