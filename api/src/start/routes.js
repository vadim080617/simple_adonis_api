/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.get('/', () => ({ status: 'Ok', version: '1.0.0' }));

Route.resource('products', 'ProductController');
Route.resource('types', 'TypeController');

Route.get('/types/:id/attrs', 'AttributeController.index');
Route.post('/types/:id/attrs', 'AttributeController.store');
Route.patch('/types/:id/attrs/:attrid', 'AttributeController.update');
Route.delete('/types/:id/attrs/:attrid', 'AttributeController.destroy');

Route.get('/users', 'UserController.index');
