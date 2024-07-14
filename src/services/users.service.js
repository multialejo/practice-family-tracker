import db from '../db/index.js';

const userService = {
  table: 'users',
  single_table: 'user',
  currentUserId: null,
  setCurrentUserId: function (newCurrentUserId) {
    this.currentUserId = newCurrentUserId;
  },
  getAll: async function () {
    try {
      const result = await db.query(`SELECT * FROM ${this.table};`);
      return result.rows;
    } catch (error) {
      console.error(`Error fetching all ${this.table}:`, error);
      throw error;
    }
  },
  getById: async function (userId) {
    try {
      const result = await db.query(
        `SELECT * FROM ${this.table} WHERE id = ${userId};`
      );
      return result.rows[0];
    } catch (error) {
      console.error(`Error fetching ${this.single_table} by ID:`, error);
      throw error;
    }
  },
  save: async function (name, color) {
    try {
      await db.query(
        `INSERT INTO ${this.table} (name, color) VALUES ($1, $2);`,
        [name, color]
      );
    } catch (error) {
      console.error(`Error saving ${this.single_table}:`, error);
      throw error;
    }
  },
};

export default userService;
