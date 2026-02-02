import { t } from "elysia";

export const CreateOrderItemSchema = t.Object({
  orderId: t.Numeric({ minimum: 1 }),
  foodId: t.Numeric({ minimum: 1 }),
  quantity: t.Numeric({ minimum: 1 }),
});

export const OrderItemParamsSchema = t.Object({
  id: t.Numeric({ minimum: 1 }),
});

export const UpdateOrderItemSchema = t.Object({
  quantity: t.Numeric({ minimum: 1 }),
});
