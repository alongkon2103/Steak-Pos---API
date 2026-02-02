import { t } from "elysia";


export const CreateTableSchema = t.Object({
    name: t.String({ minLength: 1 })
})

export const UpdateTableSchema = t.Object({
    name: t.String({ minLength: 1 }),
    status: t.Enum({
        AVAILABLE: 'AVAILABLE',
        OCCUPIED: 'OCCUPIED'
    })
});

export const TableParamsSchema = t.Object({
    id: t.Numeric()
});
