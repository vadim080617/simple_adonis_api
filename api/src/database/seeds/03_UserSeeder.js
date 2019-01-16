const User = use('App/Models/User');
const Factory = use('Factory');
const Role = use('App/Models/Role');

class UserSeeder {
  async run() {
    await User.query().delete();
    const { rows: roles } = await Role.all();
    await Promise.all(roles.map(el => Factory.model('App/Models/User').create({ role_id: el.id })));
  }
}

module.exports = UserSeeder;
