import db from '../db/index.js';

const countryService = {
  table: 'countries',
  single_table: 'country',

  getAll: async function () {
    try {
      const result = await db.query(`SELECT * FROM ${this.table};`);
      return result.rows;
    } catch (error) {
      console.error(`Error fetching all ${this.table}:`, error);
      throw error;
    }
  },
  getByName: async function (countryName) {
    if (!countryName) {
      throw new Error('Missing country name');
    }
    try {
      const result = await db.query(
        `SELECT id FROM ${this.table} WHERE LOWER(country_name) LIKE '%' || $1 || '%';`,
        [countryName.toLowerCase()]
      );
      if (!result.rows[0]) {
        throw new Error('Country not found');
      }
      return result.rows[0];
    } catch (error) {
      console.log(
        `Error fetching ${this.single_table} by name (${countryName})`
      );
      throw error;
    }
  },
};
export default countryService;
