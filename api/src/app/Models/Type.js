/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Type extends Model {
  static boot() {
    super.boot();
    this.addTrait('App/Models/Traits/Repository');
  }

  static get createdAtColumn() {
    return false;
  }

  static get updatedAtColumn() {
    return false;
  }

  attributes() {
    return this.hasMany('App/Models/Attribute', 'id', 'type_id');
  }
}

module.exports = Type;
