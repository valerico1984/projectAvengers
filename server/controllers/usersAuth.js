const userAuth = require('../models').userAuth;
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = {
	
	async create(req, res) {
		
		return userAuth
			.findOrCreate({
				where: {
					userName: req.body.userName,
					email: req.body.email,
					password: req.body.password	
						}
			})
			.then(userAuth => res.status(200).send(userAuth))
			.catch(error => res.status(400).send(error))
		},

		
	
	async login(req, res) {

	try{	// We look for the user by email
		const user = await userAuth.findOne({
			where: {
				userName: req.body.userName,
				password: req.body.password
		
			}
		});
		
		// If the user exists by userName
		if (user) {
			// Checking the password in the database with the received in the body
			const password_valid = bcrypt.compare(req.body.password, user.password);
			// We validate if the password is correct so we print the token
			if (password_valid) {
				token = jwt.sign({
					'id': user.id,
					'email': user.email,
					'userName': user.userName
				}, process.env.SECRET);

				// Everything is correct so we print the token
				res.status(200).json({ token: token, userId: user.id, userName: user.userName })
			} else {
				res.status(400).json({ message: "Password Incorrect" });
			}
		} else {
			res.status(404).json({ message: "User does not exist" });
		}}
	
		catch(error){
			return error.status(404).json({message:'El usuario no existe' });
			
		}
	},

	
	async me(req, res) {

		try {
			let token = req.headers['authorization'];
			let decoded = jwt.verify(token, process.env.SECRET);
			let reqUser = decoded;
			if (reqUser) {
				let user = await userAuth.findOne({ where: { id: reqUser.id }, attributes: { exclude: ["password"] } });
				if (user === null) {
					res.status(404).json({ 'msg': "User not found" });
				} else {
					res.status(200).json(user);
				}
			}
		} catch (err) {
			res.status(401).send(err);
		}
	}
}
