import type { Category, createCategoryInput, updatecategoryInput } from "../types/category.model";

import { db } from "../index";



export const craeteCategory = (category: createCategoryInput) => {
    const query = db.query(
        `INSERT INTO Category (name) 
         VALUES (?)`
    );
    return query.run(category.name);
}

export const getCategoryById = (id: number): Category | undefined => {
    const query = db.query<Category, number>(`SELECT * FROM Category WHERE id = ?`);
    return query.get(id) ?? undefined;
};

export const getAllCategory = (): Category[] => {
    const query = db.query<Category, []>(`SELECT * FROM Category`);
    return query.all();
};

export const updateCategory = (id: number, category: updatecategoryInput) => {
    const query = db.query(`
    UPDATE Category
    SET
      name = COALESCE(?, name)
    WHERE id = ?
  `);

    const result = query.run(
        category.name ?? null,
        id
    );

    console.log(result);
    return result;

};


export const deleteCategory= (id: number) => {
    const query = db.query(`Delete from Category WHERE id = ?`);
    return query.run(id);
};