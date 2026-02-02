import { getTableById } from "../db/table.db";

export const checkAvalibleTableService = (tableId: number) => {
  const table = getTableById(tableId);

  if (!table) {
    throw new Error('TABLE_NOT_FOUND');
  }

  if (table.status === 'OCCUPIED') {
    return false;
  }

  return true;
};