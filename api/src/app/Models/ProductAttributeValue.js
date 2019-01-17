/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class ProductAttributeValue extends Model {
  static get table() {
    return 'products_attributes';
  }

  static get updatedAtColumn() {
    return false;
  }

  static get createdAtColumn() {
    return false;
  }

  attr() {
    return this.belongsTo('App/Models/Attribute', 'attr_id');
  }
}

module.exports = ProductAttributeValue;
