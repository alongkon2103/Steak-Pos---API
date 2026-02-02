import Elysia from "elysia";
import { insertOrder, getAllOrders, getOrderById, updateOrder, closeOrder, deleteOrder } from '../db/order.db'
import { CreateOrderSchema, OrderParamsSchema, MoveOrderTableSchema, CloseOrderSchema } from '../schemas/order.schema'
import { createOrderService, moveOrderTableService, closeOrderService } from '../services/order.service'
import { calculateOrderTotal } from "../db/orderItem.db";
export const ordersController = new Elysia({ prefix: "/orders" })


    .get("/", () => {
        const orders = getAllOrders();
        return { orders };
    })

    .get("/:id", ({ params }) => {
        const order = getOrderById(params.id);
        return { order };
    }, {
        params: OrderParamsSchema
    })
    .post("/", ({ body }) => {
        const result = createOrderService(body);

        return {
            success: true,
            orderId: result.lastInsertRowid,
        };
    }, {
        body: CreateOrderSchema
    })

    .delete("/", ({ body }) => {
        const result = deleteOrder(body.id);
        return {
            success: true,
            changes: result.changes
        };
    }, {
        body: OrderParamsSchema
    })

    .patch("/:id/move-table", ({ params, body }) => {
        const result = moveOrderTableService(params.id, body.newTableId);
        return {
            success: true,
            changes: result
        };
    }, {
        params: OrderParamsSchema,
        body: MoveOrderTableSchema
    })

    .patch("/:id/close", ({ params }) => {
        const result = closeOrderService(params.id);

        return {
            success: true,
            orderId: result.orderId,
            total: result.total,
        };
    }, {
        params: OrderParamsSchema,
    });



