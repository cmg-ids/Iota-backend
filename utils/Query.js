const db = require("../config/database");

module.exports = class DB {
  // ? ****************************************** Insert Data ****************************************** */
  static insert(tableName, data) {
    return db.query(`INSERT INTO ${tableName} SET ?`, data);
  }

  // ? ****************************************** Get Data ****************************************** */
  static get(tableName) {
    return db.query(`SELECT * FROM ${tableName} ORDER BY created_at DESC`);
  }

  // ? ****************************************** Find Data ****************************************** */
  static where(tableName, condition) {
    return db.query(`SELECT * FROM ${tableName} WHERE ${condition}`);
  }

  // ? ****************************************** Find By Id ****************************************** */
  static find(tableName, id) {
    return db.query(`SELECT * FROM ${tableName} WHERE id = ${id}`);
  }

  // ? ****************************************** Find By limit ****************************************** */
  static limit(tableName, condition, limit = 1) {
    return db.query(
      `SELECT * FROM ${tableName} WHERE ${condition} LIMIT ${limit}`
    );
  }

  // ? ****************************************** Delete ****************************************** */
  static delete(tableName, id) {
    return db.query(`DELETE FROM ${tableName} WHERE id = ${id}`);
  }

  // ? ****************************************** Join ****************************************** */
  static async join(tableName, joinTableNames = []) {
    let currentTableData = await db.query(
      `SELECT * FROM ${tableName} ORDER BY created_at DESC`
    );
    for (let index = 0; index < currentTableData[0].length; index++) {
      for (const joinTableName of joinTableNames) {
        let joinTableData = await this.find(
          joinTableName,
          currentTableData[0][index][`${joinTableName.slice(0, -1)}_id`]
        );
        currentTableData[0][index][`${joinTableName.slice(0, -1)}`] =
          joinTableData[0][0];
      }
    }
    return currentTableData;
  }
};
