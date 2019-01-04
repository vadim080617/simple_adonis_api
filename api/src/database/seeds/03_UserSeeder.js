const Hash = use('Hash');
const User = use('App/Models/User');

class UserSeeder {
  async run() {
    await User.query().delete();

    await User.create({
      username: 'admin',
      email: 'admin@domain.com',
      password: await Hash.make('123456'),
      role_id: User.ADMIN_ROLE_ID
    });

    await User.create({
      username: 'customer',
      email: 'customer@domain.com',
      password: await Hash.make('123456'),
      role_id: User.CUSTOMER_ROLE_ID
    });
  }
}

module.exports = UserSeeder
