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

const jobUrl = 'https://careers.google.com/api/v3/search/?distance=50&q=Software%20Engineer%20II';
const getJobs = async()=> {
    let res = await got.get(jobUrl).json();
	const matcher = /^Software Engineer II[^I]/;
	res = filterByTitle(res.jobs, matcher);
    console.log(res);
}

//filter for jobs based on title
const filterByTitle = (data, title) =>{
	let filtered = [];
	data.forEach(job => {
		if(title.exec(job.title)){
			filtered.push(job);
		}
	});
	return filtered;
}


//test
(async function(){
    await getJobs();
})();
