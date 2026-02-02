import { Elysia } from "elysia";
import { CreateOrderItemSchema,OrderItemParamsSchema,UpdateOrderItemSchema } from "../schemas/orderItems.schema";
import { OrderParamsSchema } from "../schemas/order.schema";
import { createOrderItem } from "../services/orderItems.service";
import { getOrderItemsByOrderId } from "../db/orderItem.db";

export const OrderItemsController = new Elysia({ prefix: '/order-items' })

    .post("/items", ({ body }) => {
        console.log(body)
        const result = createOrderItem(body.orderId, body.foodId, body.quantity);
        return {
            success: true,
            orderItemId: result.orderItemId,
        };
    }, {
        body: CreateOrderItemSchema
    })

    .get("/:id/items", ({ params }) => {
        const items = getOrderItemsByOrderId(params.id);
        return { items };
    }, {
        params: OrderParamsSchema
    })


