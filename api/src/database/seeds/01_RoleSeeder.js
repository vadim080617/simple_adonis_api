const Role = use('App/Models/Role');

class RoleSeeder {
  async run() {
    const roles = [{ role: 'admin' }, { role: 'customer' }];
    for(let i = 0; i < roles.length; i++){
      const role = roles[i];
      const findingObj = { id: i + 1, ...role };
      await Role.findOrCreate(findingObj, findingObj);
    }
  }
}

module.exports = RoleSeeder;
