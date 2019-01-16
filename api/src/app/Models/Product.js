/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Product extends Model {
  static boot() {
    super.boot();
    this.addTrait('Product');
  }

  static get updatedAtColumn() {
    return false;
  }

  attrs() {
    return this.belongsToMany('App/Models/Attribute', 'product_id', 'attr_id')
      .pivotModel('App/Models/ProductAttributeValue')
      .withPivot(['value']);
  }
}

module.exports = Product;
