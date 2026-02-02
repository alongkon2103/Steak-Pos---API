import type { Food,CreateFoodInput, UpdateFoodInput } from "../types/food.model";
import { db } from "../index";


export const createFood = (food: CreateFoodInput) => {
    const query = db.query(
        `INSERT INTO Food (name, price, imagePath, categoryId) 
         VALUES (?, ?, ?, ?)`
    );
    return query.run(food.name, food.price, food.imagePath, food.categoryId);
};


export const getFoodById = (id: number): Food | undefined => {
    const query = db.query<Food, number>(`SELECT * FROM Food WHERE id = ?`);
    return query.get(id) ?? undefined;
};

export const getAllFoods = (): Food[] => {
    const query = db.query<Food, []>(`SELECT * FROM Food WHERE isActive = 1`);
    return query.all();
};

export const updateFood = (id: number, food: UpdateFoodInput) => {
  const query = db.query(`
    UPDATE Food
    SET
      name = COALESCE(?, name),
      price = COALESCE(?, price),
      imagePath = COALESCE(?, imagePath),
      categoryId = COALESCE(?, categoryId),
      isActive = COALESCE(?, isActive)
    WHERE id = ?
  `);

const result = query.run(
  food.name ?? null,
  food.price ?? null,
  food.imagePath ?? null,
  food.categoryId ?? null,
  food.isActive ?? null,

  id
);

console.log(result);
return result;

};


export const deleteFood = (id: number) => {
    const query = db.query(`Delete from Food WHERE id = ?`);
    return query.run(id);
};