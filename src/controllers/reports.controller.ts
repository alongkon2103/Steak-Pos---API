import { Elysia } from "elysia";
import { getDailySales, getTopFoods,getOrderHistory,getTodayOverview} from "../db/report.db";


export const reportsController = new Elysia({ prefix: "/reports" })
    .get("/",()=>{return "Reports"})
   .get("/overview", () => getTodayOverview())
    .get("/sales/daily", () => getDailySales())
    .get("/top-foods", () => getTopFoods())
    .get("/orders", () => getOrderHistory())