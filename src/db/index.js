import pg from 'pg';
import config from '../../config/index.js';

const { db: dbConfig } = config;

const db = new pg.Client({
  ...dbConfig,
  database: dbConfig.name,
});

export default db;
