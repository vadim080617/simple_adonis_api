/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.get('/', () => ({ status: 'Ok', version: '1.0.0' }));

Route.resource('products', 'ProductController')
  .apiOnly()
  .validator(new Map([
    [['products.index'], ['GetProducts']],
    [['products.store'], ['StoreProduct']],
  ]))
  .middleware(new Map([
    [['products.store'], ['productAttrValidator']],
  ]));
Route.get('/types', 'ProductTypeController.index');
Route.get('/types/:id', 'ProductTypeController.show');
Route.delete('/types/:id', 'ProductTypeController.delete');

Route.get('/types/:id/attrs', 'AttributeController.index');