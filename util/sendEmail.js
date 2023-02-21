import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
dotenv.config();


const user = process.env.MAIL_USER;
const pass = process.env.MAIL_PASS;
const host = process.env.MAIL_HOST;
const port = process.env.MAIL_PORT;
const from = process.env.MAIL_FROM;

export const sendMail = (to, mailText) => {
	console.log("Preparing to send mail to " + to);
	let transporter = nodemailer.createTransport({
		host: host,
		port: port,
		secure: true,
		auth:{
			user: user,
			pass: pass,
		}
	});

	transporter.sendMail({
		from: from,
		to: to,
		subject:"New Job Listing:",
		encoding: 'quoted-printable',
		text: mailText
	});
}
	

