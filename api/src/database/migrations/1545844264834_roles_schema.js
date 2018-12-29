/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class RolesSchema extends Schema {
  up() {
    this.create('roles', table => {
      table.increments();
      table
        .string('role', 255)
        .notNullable()
        .unique();
      table.timestamps();
    });
  }

  down() {
    this.drop('roles');
  }
}

module.exports = RolesSchema;
