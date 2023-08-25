const { createdAt, updatedAt } = require("../utils/AccessorsAndMutators");
const DB = require("../utils/Query");

module.exports = class ContactUs {
  tableName = "contact_us";
  static tableName = "contact_us";
  constructor(body) {
    this.body = {
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      number: body.number,
      country: body.country,
      message: body.message,
      created_at: createdAt(),
      updated_at: updatedAt(),
    };
  }

  // ? **************************************************************** Save the contacts ********************************************************* */
  save() {
    return DB.insert(this.tableName, this.body);
  }

  // ? **************************************** show the contacts ************************************************ */
  static show() {
    return DB.get(this.tableName);
  }

  // ? **************************************** Find by the Id ************************************************ */
  static findById(id) {
    return DB.find(this.tableName, id);
  }

  // ? ************************************* find one **************************************** */
  static findOne(condition, limit) {
    return DB.limit(this.tableName, condition, limit);
  }

  // ? ************************************* find **************************************** */
  static find(condition) {
    return DB.where(this.tableName, condition);
  }
};
