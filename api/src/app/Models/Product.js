/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Product extends Model {
  static boot() {
    super.boot();
    this.addTrait('App/Models/Traits/Repository');
  }

  static get updatedAtColumn() {
    return false;
  }

  attrs() {
    return this.belongsToMany('App/Models/Attribute', 'product_id', 'attr_id')
      .pivotModel('App/Models/ProductAttributeValue')
      .withPivot(['value']);
  }

  type() {
    return this.belongsTo('App/Models/Type');
  }

  user() {
    return this.belongsTo('App/Models/User');
  }
}

module.exports = Product;
