const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root"
});

con.connect(err => {
  if (err) throw err;
  console.log("Connected!");
});

const getWatches = (req, res, next) => {

	const query = `SELECT * FROM DB.watches`;

	con.query(query, (err, result, field) => {
		if(err) throw err;

		res
		.status(200)
		.send(result);

	});
}

const signUp = (req, res, next) => {

	const user = req.body.username;
	const pass = req.body.password;

	const query = `INSERT INTO DB.login VALUES ("{user}", "{pass}")`
		.replace('{user}', user)
		.replace('{pass}', pass);

	con.query(query, (err, result, field) => {
		if(err) 
			res
				.status(500)
				.send({success: false, err })
		else
			res
			.status(200)
			.send({success: true});

	});
}

const login = (req, res, next) => {

	const user = req.body.username;
	const pass = req.body.password;

	const query = `SELECT * FROM DB.login WHERE username='{user}'`
		.replace('{user}', user);

	con.query(query, (err, result, field) => {
		if(err) 
			res
				.status(500)
				.send({success: false, err })
		else {
			if(!result[0])
				res
					.status(500)
					.send({success: false, err: "User not found!"});
			else if(result[0] && result[0].password === pass)
				res
				.status(200)
				.send({success: true});
			else
				res
					.status(500)
					.send({success: false, err: "Password Incorrect!"});
		}
	});
}

const err = (err, req, res, next) => {
	console.error(err);
	res
		.status(err.statusCode || 500)
		.send({ errors: [err.message ?? 'Internal server error'] });
};

app
	.use(cors())
	.use(express.json())
	.get('/watches', getWatches)
	.post('/signup', signUp)
	.post('/login', login)
	.use(err)
	.listen(port, () => {
		console.log(`Listening @ http://localhost:${port}`);
	});
