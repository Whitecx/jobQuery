# JobQuery 
###### NodeJS app to send text alerts for entry level SWE positions

## DESC
Motivation: Some career pages don't filter entry level jobs well, or keep you updated with relevant positions

Goal: Send users text alerts when an entry level position opens. Support lots of companies!

## Supported Career Sites:
Google - Looks explicitely for listings containing Software Engineer II 

## Install & Run
1. Clone Repo
2. Run npm install
3. Set your .env vars to configure the app (there's a sample called .env.sample)
4. Run npm start

## ENV Vars
TO_ADDRESS={phonenumber}@{carrier-gateway}

MAIL_USER={smtp-user-name}

MAIL_PASS={smtp-password}

MAIL_HOST={smtp-host}

MAIL_PORT={smtp-host}

MAIL_FROM=<email-address>

This app [uses email to send SMS messages](https://en.wikipedia.org/wiki/SMS_gateway). To determine the TO_ADDRESS, lookup the sms gateway for your cell service provider.
If you don't have your own smtp server, you can use a service like [sendgrid](https://sendgrid.com/solutions/email-api/smtp-service/?utm_source=google&utm_medium=cpc&utm_term=sendgrid&utm_campaign=Sitelink_SendGrid_G_S_NAMER_Brand_Tier1&cq_plac=&cq_net=g&cq_pos=&cq_med=&cq_plt=gp&gclid=CjwKCAiAl9efBhAkEiwA4ToriqLLpzC1HsM1jgWBhklkxo8pwRXHXt-i3ars6N2LLhZOPKwvGFSMOxoCphoQAvD_BwE). I use them since they have a free tier

