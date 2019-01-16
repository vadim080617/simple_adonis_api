/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ProductsSchema extends Schema {
  up() {
    this.create('types', table => {
      table.increments();
      table.string('type');
    });

    this.create('products', table => {
      table.increments();
      table.string('name');
      table
        .integer('type_id')
        .unsigned()
        .references('id')
        .inTable('types')
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
    this.drop('types');
  }
}

module.exports = ProductsSchema;
