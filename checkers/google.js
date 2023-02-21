/*
* Get latest software engineering jobs from google.
* Check for any that are entry level
* Text me if one appears!
*/

/*
v1.0
1. Request lib
2. Parse json
3. Leverage email/text service?
*/

import got from 'got';
import * as DB from '../db/sqlite.js';
import * as Mail from '../util/sendEmail.js';

const jobUrl = 'https://careers.google.com/api/v3/search/?distance=50&q=Software%20Engineer%20II';
export const getJobs = async(recipient)=> {
	//get job listings from google api
    let res = await got.get(jobUrl).json();
	const matcher = /^Software Engineer II[^I]/;
	//test matcher: const matcher = /^Software Engineer III/;
	//filter jobs via matcher regex
	let filtered = filterByTitle(res.jobs, matcher);
	//filter out jobs that we have already seen
	let newJobs = await filterBySeen(filtered);
	//If no new jobs, stop
	if(newJobs.length == 0){ return; }
	//Create a single alert text w/ all new jobs
	let prepared  = preparePayload(newJobs);
	//prevent from getting alerted about these jobs again
	updateDb(filtered);
	//Send a notification
	/*
	prepared.forEach(msg => {
		Mail.sendMail(recipient, msg);	
	})
	*/
}

//filter for jobs based on title and if they've 
const filterByTitle = (data, title) =>{
	let filtered = [];
	data.forEach(job => {
		if(title.exec(job.title)){
			filtered.push(job);
		}
	});
	return filtered;
}

const filterBySeen = async (data) => {
	let filtered = [];
	for(let i=0; i<data.length; i++){
		let job = data[i];
		let bool = await DB.checkExists(job.apply_url);
		if(!bool){
			filtered.push(job);
		}
	}
	return filtered;
}
//Return the title and url for each job listing
	//SMS gateway has 140 char limit. Best to send individually
const preparePayload = (data) => {
	let jobMsg  = [];
	data.forEach(job => {
		 jobMsg.push(`${job.title}: ${job.apply_url} \r\n`);
	});
	return jobMsg;
}


const updateDb = (data) => {
	data.forEach(job => {
		DB.insertJob(job.title, job.apply_url, "google");
	});
}
