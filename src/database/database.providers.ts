import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import { AdminModel } from '../admin/model/admin.model';
import { PasswordReset } from '../admin/model/passwordreset.model';
import { StaffModel } from 'src/admin-actions/model/staff.model';

dotenv.config();

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        port: +process.env.DATABASE_PORT,
        host: process.env.DATABASE_HOST,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        logging: (msg: string, timing) => {
          Logger.log(msg, 'Database');
        },
        sync: {
          alter: true,
        },
      });
      sequelize.addModels([AdminModel, PasswordReset, StaffModel]);
      return sequelize;
    },
  },
];
