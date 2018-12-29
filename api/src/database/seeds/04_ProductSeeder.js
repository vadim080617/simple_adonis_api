const Product = use('App/Models/Product');

class ProductSeeder {
  async run() {
    await Product.findOrCreate(
      {
        name: 'testPhone1'
      },
      {
        name: 'testPhone1',
        type_id: 1,
        user_id: 2,
        price: 200
      }
    );
    await Product.findOrCreate(
      {
        name: 'testCar1'
      },
      {
        name: 'testCar1',
        type_id: 2,
        user_id: 2,
        price: 20034
      }
    );
  }
}

module.exports = ProductSeeder;
