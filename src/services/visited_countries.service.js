import db from '../db/index.js';

const visitedCountriesService = {
  table: 'visited_countries',
  getVisitedCountryCodes: async function (currentUserId) {
    try {
      const query = `SELECT country_code FROM ${this.table} JOIN countries ON countries.id = visited_countries.country_id WHERE user_id = ${currentUserId};`;
      const result = await db.query(query);
      return result.rows.map((country) => country.country_code);
    } catch (error) {
      console.error(
        `Error fetching visited country codes for user ${currentUserId}:`,
        error
      );
      throw error;
    }
  },
  setVisitedCountries: async function (userId, countryId) {
    try {
      await db.query(
        `INSERT INTO ${this.table} (user_id, country_id) VALUES ($1, $2);`,
        [userId, countryId]
      );
    } catch (error) {
      console.error('Error setting visited countries:', error);
      throw error;
    }
  },
};

export default visitedCountriesService;
