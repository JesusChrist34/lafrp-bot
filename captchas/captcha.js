const path = require("path"),
	fs = require("fs"),
	Captcha = require("@haileybot/captcha-generator");

let captcha = new Captcha();
captcha.PNGStream.pipe(fs.createWriteStream(path.join(__dirname, `${captcha.value}.png`)));
captcha.JPEGStream.pipe(fs.createWriteStream(path.join(__dirname, `${captcha.value}.jpeg`)));