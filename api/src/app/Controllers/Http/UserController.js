const User = use('App/Models/User');

class UserController {
  async index() {
    const users = await User.all();
    return users;
  }
}

module.exports = UserController;
