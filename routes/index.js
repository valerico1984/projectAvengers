// Controllers
const usersController = require('../controllers/users');
const usersAuthController = require('../controllers/usersAuth');
const taskController = require('../controllers/task');
const tasks_usersController = require('../controllers/tasks_users');


module.exports = (app) => {

	app.get('/api', (req, res) => res.status(200).send({
		message: '¡Esta es una buena señal! Nuestro Node.js está funcionando correctamente ;)',
	}));

     app.get("/avengers", (req,res)=>{
		res.status(200).send(res.json())
	 })


	// Routes of Web Services
	// Users login
	app.post('/api/register', usersAuthController.create);
	app.post('/api/login', usersAuthController.login);
	app.get('/api/me', usersAuthController.me);

	app.post('/api/user/create/username/:username/status/:status', usersController.create);
	app.get('/api/user/list/status/:status', usersController.list);
	app.get('/api/user/find/username/:username', usersController.find);
	app.post('/api/user/updateUser', usersController.updateUser);
	

	// 
	app.post('/api/task/create', taskController.create);
	app.get('/api/task/list', taskController.list);
	app.get('/api/task/list/:userId', taskController.find);
	app.get('/api/task/delete/:id', taskController.delete);
	app.patch('/api/task/update/:id', taskController.update);



	app.post('/api/tasks_users/create', tasks_usersController.create);


};

