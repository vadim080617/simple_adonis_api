/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Product extends Model {
  static boot() {
    super.boot();
    this.addTrait('Product');
  }

  attrValues() {
    return this.hasMany('App/Models/ProductAttributeValue', 'id', 'product_id');
  }

  attrs() {
    return this.belongsToMany('App/Models/Attribute', 'product_id', 'attr_id').pivotTable('products_attributes');
  }
}

module.exports = Product;
