import { Elysia } from "elysia";
import { craeteCategory, getCategoryById, getAllCategory, updateCategory, deleteCategory } from '../db/category.db'
import { CategoryParamsSchema, CreateCategorySchema, UpdateCategorySchema } from '../schemas/category.schema'

export const categoriesController = new Elysia({ prefix: '/categories' })
    .get("/", () => {
        const categories = getAllCategory();
        return { categories }
    })

    .get("/:id", ({ params }) => {
        const category = getCategoryById(params.id);
        if (!category) {
            return { error: 'Category not found' }
        }
        return category
    }, {
        params: CategoryParamsSchema
    })

    .post("/", ({ body }) => {
        const result = craeteCategory(body);
        return {
            success: true,
            categoryId: result.lastInsertRowid
        };
    }, {
        body: CreateCategorySchema
    })

    .patch('/:id', ({ params, body }) => {
        const result = updateCategory(params.id, body)
        return {
            success: true,
            changes: result.changes
        }
    }, {
        params: CategoryParamsSchema,
        body: UpdateCategorySchema
    })

    .delete("/", ({ body }) => {
        const result = deleteCategory(body.id);
        return {
            success: true,
            changes: result.changes
        };
    }, {
        body: CategoryParamsSchema
    });