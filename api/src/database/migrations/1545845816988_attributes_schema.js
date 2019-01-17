/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AttributesSchema extends Schema {
  up() {
    this.create('attributes', table => {
      table.increments();
      table.string('attribute');
      table
        .integer('type_id')
        .unsigned()
        .references('id')
        .inTable('types')
        .onDelete('cascade');
    });
  }

  down() {
    this.drop('attributes');
  }
}

module.exports = AttributesSchema;
