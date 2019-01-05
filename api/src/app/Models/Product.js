/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Product extends Model {
  attrValues() {
    return this.hasMany('App/Models/ProductAttributeValue', 'id', 'product_id');
  }
}

module.exports = Product;
