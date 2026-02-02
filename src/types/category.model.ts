
export interface Category {
    id?: number;
    name: string;
}

export type createCategoryInput = Omit<Category, 'id'>
export type updatecategoryInput = Partial<Category>