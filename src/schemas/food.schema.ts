import { t } from "elysia";

export const CreateFoodWithImageSchema = t.Object({
  name: t.String(),
  price: t.Numeric(),
  categoryId: t.Numeric(),
  image: t.File({
    type: ["image/png", "image/jpeg"],
    maxSize: "5m"
  })
});


export const UpdateFoodSchema = t.Partial(
  t.Object({
    name: t.String({ minLength: 1 }),
    price: t.Number({ minimum: 0 }),
    imagePath: t.Nullable(t.String()),
    categoryId: t.Number({ minimum: 1 }),
    isActive: t.Boolean()
  })
);


export const FoodParamsSchema = t.Object({
    id: t.Numeric() 
});