import { getDb } from '../utils/get-db.util';

export const up = async (): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const db = await getDb();
  /*
    Code your update script here!
  */
};

export const down = async (): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const db = await getDb();
  /*
    Code you downgrade script here!
  */
};
