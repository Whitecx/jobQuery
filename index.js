import * as google from './checkers/google.js';
import * as dotenv from 'dotenv';
dotenv.config();
//Use this to kick off different modules for tracking jobs
const jobs = async() => {
	console.log("Checking for jobs..");
	const recipient = process.env.TO_ADDRESS;
	google.getJobs(recipient);
}
//Run checks on a timer
(async function(){
	const delay = 1000 * 60 * 60 //every hour
	await jobs();//first run
	//run every interval
	setInterval(async() => {await jobs()}, delay);
})();

