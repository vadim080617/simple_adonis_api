/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class ProductAttributeValue extends Model {
  static get table() {
    return 'products_attributes';
  }

  attr() {
    return this.belongsTo('App/Models/Attribute', 'attr_id');
  }
}

module.exports = ProductAttributeValue;
