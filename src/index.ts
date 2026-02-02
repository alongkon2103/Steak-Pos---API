
import { Elysia } from "elysia";
import { Database } from "bun:sqlite";
import { foodController } from "./controllers/food.controller";
import { categoriesController } from "./controllers/category.controller";
import { tableController } from "./controllers/table.controller";
import { ordersController } from "./controllers/order.controller";
import { OrderItemsController } from "./controllers/orderItems.controller";
import { reportsController } from "./controllers/reports.controller";
export const db = new Database("mydb.sqlite");

const app = new Elysia()
    .get("/", () => "Steak POS API")
    .use(foodController)
    .use(categoriesController)
    .use(tableController)
    .use(ordersController)
    .use(OrderItemsController)
    .use(reportsController)
    .listen(3000);


console.log(` Server running at ${app.server?.hostname}:${app.server?.port}`);
