const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root"
});

con.connect(err => {
  if (err) throw err;
  console.log("Connected!");
});

const json = JSON.parse(`
[
	{
		"name": "CARL F. BUCHERER Manero Flyback Green",
		"des": "Watches from the Carl F. Bucherer Manero collection uniformly sport sapphire crystal case backs to allow an insight into the intricate mechanics behind each piece. The muted white or simplistic black dials are protected with glare-proof sapphire glass. The cases with fixed bezels are crafted from 18K rose gold or stainless steel. Most dials sport supplementary subdials whilst all are equipped with the date function. Movements vary from automatic to hand-wound, all providing precise timekeeping functions.",
		"img": "0.jpg"
	},
	{
		"name": "FREDERIQUE CONSTANT Highlife Automatic Cosc",
		"des": "The machinery inside a watch that keeps things ticking is called the movement or a calibre. A synonym of size, the word ‘calibre’, first used as a watchmaking term in 1715, originally referred to the build of a watch movement—the layout, dimensions, shape and size of the wheels, barrels, bridges and so on. Today the word is a substitute for movement, the complete mechanism with the mainspring, escape wheel, bridges, gear train, and other components, including the rotor in automatic watches. Calibres are either mechanical or quartz-based. While the latter are powered mostly by a battery, the former can either be manual winding, or self-would by an oscillating mass or rotor.",
		"img": "1.jpg"
	},
	{
		"name": "H. MOSER & CIE. Pioneer Cylindrical Tourbillon Skeleton 3811-1200",
		"des": "Launched in 2015, the H. Moser & Cie. Pioneer collection started out with the Pioneer Centre Seconds series. Since then, the Pioneer collection has paved a minimalistic yet technical lineage for the brand.",
		"img": "2.jpg"
	},
	{
		"name": "ZENITH Defy 21",
		"des": "Zenith, a brand that is closely associated with luxury and innovation was founded in 1865 by George Favre-Jacot. Creating a sense of opulence amidst the development of much better versions of their timepieces, Zenith is a brand that crafted the world’s first automatic movement, the El Primero. This movement later became a milestone for Zenith. With Zenith raising the stakes in the watchmaking world every day, it is hard to miss the exuberance of this brand.",
		"img": "3.jpg"
	}
]`);

const query_0 = `DROP TABLE DB.watches`;

const query_1 = `CREATE TABLE DB.watches (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	name varchar(100) NOT NULL,
	des varchar(2000) NOT NULL,
	img varchar(20) NOT NULL
)`;

const query_2 = `CREATE TABLE DB.login (
	username varchar(50) PRIMARY KEY,
	password varchar(50) NOT NULL
)`;

const query_3 = `INSERT INTO DB.watches VALUES (
	{id},
	"{name}",
	"{des}",
	"{img}"
)`;

con.query(query_0, (err, result, fields) => {
	if(err) console.log(err);
	console.log(result);
});

con.query(query_1, (err, result, fields) => {
	if(err) console.log(err);
	console.log(result);
});

con.query(query_2, (err, result, fields) => {
	if(err) console.log(err);
	console.log(result);
});

json.forEach((e, i) => {
	const query = query_3
		.replace("{id}", i + 1)
		.replace("{name}", e.name)
		.replace("{des}", e.des)
		.replace("{img}", e.img);
	
	con.query(query, (err, result, fields) => {
		if(err) console.log(err);
		console.log(result);
	})
});
