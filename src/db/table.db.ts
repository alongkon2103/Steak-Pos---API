import {Table,CreateTableInput,UpdateTableInput} from '../types/table.model'

import { db } from "../index";


export const craeteTable = (Table: CreateTableInput) => {
    const query = db.query(
        `INSERT INTO tables (name) 
         VALUES (?)`
    );
    return query.run(Table.name);
}

export const getTableById = (id: number): Table | undefined => {
    const query = db.query<Table, number>(`SELECT * FROM tables WHERE id = ?`);
    return query.get(id) ?? undefined;
};

export const getAllTable = (): Table[] => {
    const query = db.query<Table, []>(`SELECT * FROM tables`);
    return query.all();
};

export const updateTable = (id: number, Table: UpdateTableInput) => {
    const query = db.query(`
    UPDATE tables
    SET
      name = COALESCE(?, name)
    WHERE id = ?
  `);

    const result = query.run(
        Table.name ?? null,
        id
    );

    console.log(result);
    return result;

};

export const updateTableStatus = (id: number, status: 'AVAILABLE' | 'OCCUPIED') => {
  const query = db.prepare(`
    UPDATE tables
    SET status = ?
    WHERE id = ?
  `);

  return query.run(status, id);
};


export const deleteTable= (id: number) => {
    const query = db.query(`Delete from Table WHERE id = ?`);
    return query.run(id);
};