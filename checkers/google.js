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

import got from got;

const jobUrl = 'https://careers.google.com/api/v3/search/?distance=50&q=Software%20Engineer%20II';
const getJobs = async()=> {
    let res = await got.get(jobUrl).json();
    res = JSON.parse(res);
    console.log(res);
}

//test
(async function(){
    await getJobs();
})();
