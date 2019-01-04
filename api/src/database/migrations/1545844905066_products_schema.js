/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ProductsSchema extends Schema {
  up() {
    this.create('product_types', table => {
      table.increments();
      table.string('type', 255);
      table.timestamps();
    });

    this.create('products', table => {
      table.increments();
      table.string('name', 255);
      table
        .integer('type_id')
        .unsigned()
        .references('id')
        .inTable('product_types')
        .onDelete('cascade');
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('cascade');
      table.double('price');
      table.timestamps('created_at');
    });
  }

  down() {
    this.drop('products');
    this.drop('product_types');
  }
}

module.exports = ProductsSchema;
