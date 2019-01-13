/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ProductsAttributesSchema extends Schema {
  up() {
    this.create('products_attributes', table => {
      table.increments();
      table
        .integer('product_id')
        .unsigned()
        .references('id')
        .inTable('products')
        .onDelete('cascade');
      table
        .integer('attr_id')
        .unsigned()
        .references('id')
        .inTable('attributes')
        .onDelete('cascade');
      table.text('value');
    });
  }

  down() {
    this.drop('products_attributes');
  }
}

module.exports = ProductsAttributesSchema;
