
import { Elysia } from "elysia";
import { createFood, getAllFoods, getFoodById, updateFood, deleteFood } from "../db/food.db";
import { CreateFoodWithImageSchema, UpdateFoodSchema, FoodParamsSchema } from "../schemas/food.schema";

export const foodController = new Elysia({ prefix: "/foods" })
    .get("/", () => {
        const foods = getAllFoods();
        return { foods };
    })

    .get("/:id", ({ params }) => {
        const food = getFoodById(params.id);
        if (!food) {
            return { error: "Food not found" };
        }
        return { food };
    }, {
        params: FoodParamsSchema
    })

    .post("/foods", async ({ body }) => {
        const { image, name, price, categoryId } = body;

        const filename = `${Date.now()}-${image.name}`;
        await Bun.write(`./uploads/foods/${filename}`, image);

        createFood({
            name,
            price,
            categoryId,
            imagePath: `/uploads/foods/${filename}`
        });

        return { success: true };
    }, {
        body: CreateFoodWithImageSchema
    })
    
    .patch("/:id", ({ params, body }) => {
        const result = updateFood(params.id, body);
        return {
            success: true,
            changes: result.changes
        };
    }, {
        params: FoodParamsSchema,
        body: UpdateFoodSchema
    })

    .delete("/", ({ body }) => {
        const result = deleteFood(body.id);
        return {
            success: true,
            changes: result.changes
        };
    }, {
        body: FoodParamsSchema
    });