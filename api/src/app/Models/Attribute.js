/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Attribute extends Model {
  static get updatedAtColumn() {
    return false;
  }

  static get createdAtColumn() {
    return false;
  }
}

module.exports = Attribute;
