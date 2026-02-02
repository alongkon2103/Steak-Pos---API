import { t } from "elysia";

export const CreateCategorySchema = t.Object({
    name:t.String({ minLength: 1 })
})

export const UpdateCategorySchema = t.Partial(CreateCategorySchema);

export const CategoryParamsSchema = t.Object({
    id: t.Numeric() 
});
