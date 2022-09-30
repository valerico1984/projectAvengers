const Sequelize = require('sequelize');
const user = require('../models').user;

module.exports = {

	create(req, res) {
		return user
			.findOrCreate({
				where: {
					userName: req.params.userName,
				},
				userName: req.params.userName,
				password: req.params.password,
                email: req.params.email
			})
			.then(user => res.status(200).send(user))
			.catch(error => res.status(400).send(error))
	},

	
	list(req, res) {
		return user
			.findAll({
				where: {
					userName: req.params.userName
				}
			})
			.then(user => res.status(200).send(user))
			.catch(error => res.status(400).send(error))
	},

	
	find(req, res) {
		return user
			.findOne({
				where: {
					userName: req.params.userName
				}
			})
			.then(user => res.status(200).send(user))
			.catch(error => res.status(400).send(error))
	},


	updateUser(req, res) {
		return user
			.update({
				userName: req.body.new_userName,
			}, {
				where: {
					userName: req.body.userName,
				},
			})
			.then(user => res.status(200).send(user))
			.catch(error => res.status(400).send(error))
	}
}
