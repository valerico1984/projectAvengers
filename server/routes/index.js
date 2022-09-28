// Controllers
const usersController = require('../controllers/users');
const usersAuthController = require('../controllers/usersAuth');
const taskController = require('../controllers/task');
const tasks_usersController = require('../controllers/tasks_users');

module.exports = (app) => {

	app.get('/api', (req, res) => res.status(200).send({
		message: '¡Esta es una buena señal! Nuestro Node.js está funcionando correctamente ;)',
	}));

     app.get("/api/result", (req,res)=>{
 
          res.json([
			{"_id": 1,
			  "userName":"Hulk",
			  "img":"https://emi9d8rzue7.exactdn.com/wp-content/uploads/2022/08/She-Hulk-Avatar-2.png?strip=all&lossy=1&ssl=1",
			"description":"Atrapado en la explosión de una bomba gamma mientras intentaba salvar la vida de un adolescente, el Dr. Bruce Banner se transformó en la increíblemente poderosa criatura llamada Hulk. Un héroe muy a menudo incomprendido, cuanto más enojado se pone Hulk, más fuerte se vuelve."},
			{"_id":2,
			  "userName":"Spider Man", "img":"https://psn100.net/img/avatar/572e4ab1da8cdb1a40f52230e685570c.png",
			"description":"Durante una visita que el brillante estudiante hacía a una exhibición científica, fue picado por una araña que había sido expuesta a los experimentos radiactivos que allí se llevaban a cabo. Esto provocó que paulatinamente Parker adquiriera poderes sobrehumanos: la velocidad, fuerza y agilidad proporcionales a las de una araña de su tamaño; un sentido arácnido que le avisa de peligros y la habilidad de adherirse y desplazarse por cualquier muro o pared, independientemente de su horizontalidad. Se las ingenia además para construir un mecanismo que le permite lanzar un viscoso producto químico a manera de telaraña."},
			{"_id": 3,
			  "userName":"Thor",
			  "description": "Thor es el único Vengador que no es de la Tierra. Thor empuña el martillo de guerra místico Mjolnir, que controla el clima, pero él también tiene fuerza, durabilidad y agilidad similares a las de un dios. Está basado en el dios del trueno mitológico del mismo nombre de la mitología nórdica.",
			  "img":"https://iconarchive.com/download/i59022/hopstarter/superhero-avatar/Avengers-Giant-Man.ico"},
			
			{"_id":4,
			  "userName":"Capitán América",
			  "img":"https://www.seekpng.com/png/full/300-3008552_avengers-avatar.png",
			"description":"El Capitán América es un super soldado patriota norteamericano que luchaba frecuentemente contra las potencias del Eje en la Segunda Guerra Mundial."},
			{"_id":5,
			  "userName":"Iron Man","img":"https://icons.iconarchive.com/icons/hopstarter/iron-man-avatar/512/Iron-Man-Mark-VI-01-icon.png",
			"description":"Tony Stark, alias Iron Man, es un genio, multimillonario, playboy y filántropo. Él no solo inventó la Armadura de Iron Man, sino que se vistió la misma. Él es el ingenioso codirector y uno de los miembros fundadores de los Vengadores. Él es el jefe de Industrias Stark, que una vez vendió tecnologías de sistemas de armas altamente sofisticadas a las organizaciones de defensa del gobierno como S.H.I.E.L.D. quien los usa para mantener la paz y el orden, pero ha alejado a su compañía del negocio de las armas._"},
			  {"_id":6,
			  "userName":"Black Widow","img":"https://icons.iconarchive.com/icons/hopstarter/superhero-avatar/256/Avengers-Black-Widow-icon.png",
			  "description":"La primera y más conocida Viuda Negra, es una agente rusa entrenada como espía, artista marcial y francotiradora, y equipada con un arsenal de armas de alta tecnología, que incluye un par de armas energéticas montadas en la muñeca y apodada 'Piquete de la viuda'."},
			{"_id":7,
			  "userName":"Hawk Eye","img":"https://tr.rbxcdn.com/b954c62a1a3b540b0100810bde59f861/420/420/Image/Png",
			"description":"Clinton Francis “Clint” Barton, también conocido como Ojo de Halcón (Hawkeye en inglés), es un personaje del universo de Marvel. En la era heroica, se une al nuevo equipo de los vengadores formado por Steve Rogers y nuevamente retoma la identidad de Ojo de Halcón. Pero también forma parte de Los nuevos vengadores con Pájaro Burlón a pesar de que después lo deja. También ayudó a La Agencia Mundial Anti-Terrorista a frustrar una operación ilegal de armas a cargo de Crossfire. Luego de una pelea con un nuevo Rōnin que resultó ser Alexei Shostakov un antiguo Guardián rojo y ex-esposo de Viuda Negra, Clint recibió un fuerte golpe en la cabeza que al principio ignoró y que pronto lo dejaría ciego pero gracias a la tecnología de Stark se pudo frenar la ceguera."}]
				)
			}

          );

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

