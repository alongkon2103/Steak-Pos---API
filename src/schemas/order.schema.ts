import { t } from "elysia";

export const CreateOrderSchema = t.Object({
  tableId: t.Numeric({ minimum: 1 }),
});

export const OrderParamsSchema = t.Object({
  id: t.Numeric({ minimum: 1 }),
});

export const MoveOrderTableSchema = t.Object({
  newTableId: t.Numeric({ minimum: 1 }),
});

export const CloseOrderSchema = t.Optional(t.Object({}));

