export interface OrderItem {
    id?: number;
    orderId: number;
    foodId: number;
    name: string;
    price: number;
    quantity: number;
}
export type CreateOrderItemInput = {
  orderId: number;
  foodId: number;
  quantity: number;
};
export type UpdateOrderItemInput = {
  quantity: number;
};
