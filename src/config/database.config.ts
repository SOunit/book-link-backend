import { Sequelize } from 'sequelize';
import { keys } from '../util/keys';

const { DATABASE_URL } = keys;

export const db = new Sequelize(DATABASE_URL!, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
