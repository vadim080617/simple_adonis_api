const Role = use('App/Models/Role');

class RoleSeeder {
  async run() {
    await Role.query().delete();
    const roles = [{ role: 'admin' }, { role: 'customer' }];
    await Role.createMany(roles);
  }
}

module.exports = RoleSeeder;
