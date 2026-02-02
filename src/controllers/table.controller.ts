import { Elysia } from "elysia";
import { craeteTable, getAllTable, getTableById, updateTable, deleteTable } from "../db/table.db";
import { CreateTableSchema, UpdateTableSchema, TableParamsSchema } from "../schemas/table.schema";

export const tableController = new Elysia({ prefix: '/tables' })
    .get("/", () => {
        const tables = getAllTable();
        return { tables };
    })

    .get("/:id", ({ params }) => {
        const table = getTableById(params.id);
        return { table };
    }, {
        params: TableParamsSchema
    })

    .post("/", ({ body }) => {
        const result = craeteTable(body)
        return {
            success: true,
            tableId: result.lastInsertRowid
        };
    }, {
        body: CreateTableSchema
    })

    .patch("/", ({ params, body }) => {
        const result = updateTable(params.id, body)
        return {
            success: true,
            change: result.changes
        }
    }, {
        params: TableParamsSchema,
        body: UpdateTableSchema
    })

    .delete("/", ({ body }) => {
        const result = deleteTable(body.id);
        return {
            success: true,
            changes: result.changes
        };
    }, {
        body: TableParamsSchema
    });