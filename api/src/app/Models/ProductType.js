/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class ProductType extends Model {
  attributes() {
    return this.belongsToMany('App/Models/Attribute', 'product_type_id', 'attr_id').pivotTable(
      'attributes_product_types'
    );
  }
}

module.exports = ProductType;
