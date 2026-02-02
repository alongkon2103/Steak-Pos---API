
export interface Food {
    id?: number;
    name: string;
    price: number;
    imagePath: string | null;
    isActive?: boolean;
    categoryId: number;
}

export type CreateFoodInput = Omit<Food, 'id' | 'isActive'>;
export type UpdateFoodInput = Partial<Food>;