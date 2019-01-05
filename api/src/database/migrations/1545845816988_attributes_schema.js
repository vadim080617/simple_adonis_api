/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AttributesSchema extends Schema {
  up() {
    this.create('attributes', table => {
      table.increments();
      table.string('attribute', 255);
      table.timestamps();
    })

    this.create('attributes_product_types', table => {
      table.increments();
      table
        .integer('product_type_id')
        .unsigned()
        .references('id')
        .inTable('product_types')
        .onDelete('cascade');
      table
        .integer('attr_id')
        .unsigned()
        .references('id')
        .inTable('attributes')
        .onDelete('cascade');
      table.timestamps();
    });
  }

  down() {
    this.drop('attributes_product_types');
    this.drop('attributes');
  }
}

module.exports = AttributesSchema
