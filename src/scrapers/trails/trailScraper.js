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

			// Update the array with the new entries
			trailInfo.push({
				name: trailName,
				status: trailStatus,
				updated: trailUpdated,
			})
		})

		// const trailName = $('.tinyTrailStatusTitle').text();
		// const trailStatus = $('.sr-only').text();
		// const trailStatusUpdated = $('.tinyTrailStatusUpdated').text();
		// const trailStatusWrapper = {
		// 	"name": trailName,
		// 	"status": trailStatus,
		// 	"updated": trailStatusUpdated
		// }


		// Log the result to the console for testing
        console.log(trailInfo);
      })
	  .catch(console.error);
	  