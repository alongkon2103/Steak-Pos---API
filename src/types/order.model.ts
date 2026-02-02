export interface Order {
    id: number;
    tableId: number;
    total: number;
    status: 'OPEN' | 'PAID' | 'CANCELED';
    openedAt: string;
    closedAt: string | null;
}


export interface CreateOrderInput {
    tableId: number;
}

export type UpdateOrderInput = Partial<{status: 'PAID' | 'CANCELED';tableId: number;}>
