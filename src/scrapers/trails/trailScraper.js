const rp = require('request-promise');
const $ = require('cheerio');
const url = 'http://tarheeltrailblazers.com/mobile/';

rp(url)
	.then(function(html) {
		//success!
		const trailStatus = [];
		for (let i = 0; i < 18; i++) {
			trailStatus.push(
				$('td > b', html)[i].children,
				$('td> font > strong', html)[i].children,
				$('td > em', html)[i].children
			);
		}
		console.log(trailStatus);
	})
	.catch(function(err) {
		//handle error
	});
