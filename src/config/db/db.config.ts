import { DbConfigInterface } from './db.interface';

import { AdminUserEntity } from 'src/modules/users/entities/user-admin';
import { UserEntity } from 'src/modules/users/entities/user-apps.entity';
import { CounselingVisitEntity } from 'src/modules/counseling-visit/entities/counseling-visit.entity';
import { FeedbackCategoryEntity } from 'src/modules/feedbacks-categories/entities/feedbacks-categories.entity';
import { FeedbackQuestionEntity } from 'src/modules/feedbacks-questions/entities/feedbacks-questions.entity';
import { FeedbackEntity } from 'src/modules/feedbacks/entities/feedback.entity';

export const dbConfig = (): DbConfigInterface => ({
  db: {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    autoLoadEntities: true,
    synchronize: false, // disabled for auto migration syncronize
    logging: true,
    entities: [
      AdminUserEntity,
      UserEntity,
      CounselingVisitEntity,
      FeedbackCategoryEntity,
      FeedbackEntity,
      FeedbackQuestionEntity,
    ],
    ssl: {
      rejectUnauthorized: false,
    },
    // charset: 'utf8mb4_unicode_ci',
  },
});
