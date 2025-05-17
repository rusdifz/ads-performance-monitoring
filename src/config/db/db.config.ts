import { DbConfigInterface } from './db.interface';

import { AdsPerformanceEntity } from 'src/modules/ads-performance/entities/ads-performance.entity';
import { AdminUserEntity } from 'src/modules/user/entities/user.entity';
import { ClientEntity } from 'src/modules/clients/entities/client.entity';
import { ContractEntity } from 'src/modules/contract/entities/contract.entity';

export const dbConfig = (): DbConfigInterface => ({
  db: {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    autoLoadEntities: true,
    synchronize: process.env.ENV === 'development' ? true : false, // disabled for auto migration syncronize
    logging: true,
    entities: [
      AdminUserEntity,
      AdsPerformanceEntity,
      ClientEntity,
      ContractEntity,
    ],
    ssl: {
      rejectUnauthorized: false,
    },
    // charset: 'utf8mb4_unicode_ci',
  },
});
