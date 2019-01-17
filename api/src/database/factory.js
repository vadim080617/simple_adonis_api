/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

Factory.blueprint('App/Models/User', (faker, i, data) => ({
  username: faker.username(),
  password: faker.password(),
  email: faker.email(),
  role_id: data.role_id
}));

Factory.blueprint('App/Models/Product', (faker, i, data) => ({
  name: faker.string(),
  type_id: data.type_id,
  user_id: data.user_id,
  price: Math.random() * 10000
}));
