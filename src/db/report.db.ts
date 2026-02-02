import { db } from "../index";

export const getTodayOverview = () => {
    return db.query(`
    SELECT
      (SELECT IFNULL(SUM(total),0)
       FROM Orders
       WHERE status='PAID'
       AND date(closedAt)=date('now')) AS totalSales,

      (SELECT COUNT(*)
       FROM Orders
       WHERE date(openedAt)=date('now')) AS totalOrders,

      (SELECT COUNT(*)
       FROM Tables
       WHERE status='AVAILABLE') AS availableTables,

      (SELECT COUNT(*)
       FROM Orders
       WHERE status='OPEN') AS openOrders
  `).get();
};

export const getDailySales = () => {
    return db.query(`
    SELECT
      date(closedAt) AS date,
      SUM(total) AS total,
      COUNT(*) AS orders
    FROM Orders
    WHERE status='PAID'
    GROUP BY date(closedAt)
    ORDER BY date DESC
    LIMIT 30
  `).all();
};
export const getTopFoods = () => {
    return db.query(`
    SELECT
      oi.foodId,
      oi.name,
      SUM(oi.quantity) AS qty,
      SUM(oi.quantity * oi.price) AS total
    FROM OrderItems oi
    JOIN Orders o ON o.id = oi.orderId
    WHERE o.status='PAID'
    GROUP BY oi.foodId
    ORDER BY qty DESC
    LIMIT 10
  `).all();
};

export const getOrderHistory = () => {
    return db.query(`
    SELECT
      o.id,
      o.tableId,
      o.total,
      o.status,
      o.openedAt,
      o.closedAt
    FROM Orders o
    ORDER BY o.openedAt DESC
    LIMIT 100
  `).all();
};
