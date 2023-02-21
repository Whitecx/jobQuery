import util from 'util';
import sqlite3 from 'sqlite3';
sqlite3.verbose();


//Create listings table to hold job listings if not exists
const initializeDB = () =>{
	const db = new sqlite3.Database('./dbfile.db');
	db.serialize(()=>{
		db.run('CREATE TABLE IF NOT EXISTS listings (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, url, TEXT, company TEXT);')
	});
	db.close((err) => {if(err){return console.error(err.message);}});
}

//Wrapper to ensure a new db connection is made and closed in each call
const dbCaller = async (func, params) => {
	const db = new sqlite3.Database('./dbfile.db');
	let res = await func(db, params);
	db.close((err) => {if(err){return console.error(err.message);}});
	return res;
}

//run a query - currently configured for query w/ params via db.get in sqlite docs. Should probably be more generic
const runQuery = async (query, params)=>{
	let args = {query: query, params: params}
	const run = async (db, args) => {
		let query = args.query;
		let params = args.params;
		let p = new Promise((resolve, reject) => {
			db.get(query, params, (err, res) => {
				if(err){reject(err)}
				resolve(res);
			});
		});
		return p;
	}
	return await dbCaller(run,args);
}

//insert job into jobs table
export const insertJob = (title, url, company) => {
	let q = `INSERT INTO listings (title, url, company)
			VALUES (?, ?, ?)`;
	runQuery(q,[title, url, company]);
}

initializeDB();

//Uses url as a primary key to check if we've seen the job already. Didn't make the actual
//primary key just in case any jobs have url schemes that are re-used, and this function
//has to be refactored as a result
export const checkExists = async (url) => {
	let q = 'SELECT * FROM listings WHERE url = ?';
	let res = await runQuery(q,[url]);
	if(res){return true}
	return false;
}
		


