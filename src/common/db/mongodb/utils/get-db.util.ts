import { MongoClient } from 'mongodb';
import type { Db } from 'mongodb';

import { mongooseConfig } from '../configuration/mongoose.config';

export const getDb = async (): Promise<Db> => {
  const client: MongoClient = await MongoClient.connect(
    process.env.MONGODB_URL,
    { auth: mongooseConfig.auth },
  );

  return client.db('library');
};
