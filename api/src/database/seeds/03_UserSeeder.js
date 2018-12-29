const Hash = use('Hash');
const User = use('App/Models/User');
const constants = use('App/Helpers/constants');

class UserSeeder {
  async run() {
    const adminUser = await User.find(1);
    if (!adminUser) {
      await User.create({
        id: 1,
        username: 'admin',
        email: 'admin@domain.com',
        password: await Hash.make('123456'),
        role_id: constants.USER_ADMIN_ROLE_ID
      });
    }

    const customerUser = await User.find(2);
    if (!customerUser) {
      await User.create({
        id: 2,
        username: 'customer',
        email: 'customer@domain.com',
        password: await Hash.make('123456'),
        role_id: constants.USER_CUSTOMER_ROLE_ID
      });
    }
  }
}

module.exports = UserSeeder;
