import dotenv from 'dotenv';
dotenv.config();

export default {
  db: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  },
  port: process.env.PORT,
  env: process.env.NODE_ENV,
};
