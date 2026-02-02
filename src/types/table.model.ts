export interface Table {
    id?: number;
    name: string;
    status?: 'AVAILABLE' | 'OCCUPIED';
}

export type CreateTableInput = Omit<Table, 'id' | 'status'>;
export type UpdateTableInput = Partial<Table>;
