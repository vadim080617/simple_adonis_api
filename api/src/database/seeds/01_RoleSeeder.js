const Role = use('App/Models/Role');

class RoleSeeder {
  async run() {
    const roles = [{ role: 'admin' }, { role: 'customer' }];
    await Promise.all(
      roles.map(async (role, i) => {
        const findingObj = { id: i + 1, ...role };
        await Role.findOrCreate(findingObj, findingObj);
      })
    );
  }
}

module.exports = RoleSeeder;
