import { Module } from '@nestjs/common';
import { Db, Logger, MongoClient } from 'mongodb';

@Module({
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async (): Promise<Db> => {
        try {
          // Logger.setLevel('debug');

          const client = await MongoClient.connect(process.env.DATABASE_HOST, {
            useUnifiedTopology: true,
          });

          return client.db(process.env.DATABASE_NAME);
        } catch (e) {
          throw e;
        }
      }
    },
  ],
  exports: ['DATABASE_CONNECTION'],
})
export class DatabaseModule {}
