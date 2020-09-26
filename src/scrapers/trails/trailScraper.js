const axios = require('axios');
const cheerio = require('cheerio');

const url = 'http://tarheeltrailblazers.com'; // The URL to scrape

axios(url)
	.then(response => {
		const html = response.data;
		const $ = cheerio.load(html);
		const trailStatusWrapper = $('.row > div');
		const trailInfo = []; // Holds the parsed trail information

		trailStatusWrapper.each(function () {

			// Searches for the class and saves the text value to a variable
			let trailName = $(this).find('.tinyTrailStatusTitle').text();
			let trailStatus = $(this).find('.sr-only').text();
			let trailUpdated = $(this).find('.tinyTrailStatusUpdated').text();

			// Delete empty entries

			function isEmpty(obj) {
				for (var key in obj) {
					if (obj.hasOwnProperty(key))
						return false;
				}
				return true;
			}

			if (isEmpty(trailName, trailStatus, trailUpdated)) {
				// Object is empty 
				delete trailName, trailStatus, trailUpdated
			} else {
				// Object is NOT empty
				trailInfo.push({
					name: trailName,
					status: trailStatus,
					updated: trailUpdated
				})

			}

		})

		// Log the result to the console for testing
		console.log(trailInfo);
	})
	.catch(console.error);
