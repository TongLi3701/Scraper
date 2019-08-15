const request = require('request');
const cheerio = require('cheerio');
const TeSsWriteApi = require('te_ss_write_api');
const fs = require('fs');

// The courses contain the basic information for each course: 
// title, url, short_description
var coursesInfo = [];

var fileName = 'coursesInfo.txt';


// function to scrape from the course list page and save the basic courses infomation in a json file.
request('https://www.fosteropenscience.eu/courses',(error, response, html) => {
  if(!error && response.statusCode == 200) {
    const $ = cheerio.load(html);
      
    // Iterate through all courses
    $('.course-featured-teaser').each((i,el) => {
      const title = $(el).find('.course-featured-teaser__title').text().replace(/\s\s+/g,'');
      const url = 'https://www.fosteropenscience.eu' + $(el).find('a').attr('href');           
      const short_description = $(el).find('.course-featured-teaser__abstract').text().replace(/\s\s+/g,'');

      //Add all courses to the array.
      coursesInfo.push({
        'title': title,   
        'url': url,
        'short_description': short_description
      })
    })
    var json = JSON.stringify(coursesInfo); 
    fs.writeFile(fileName, json, function(err, result) {
      if(err) console.log('error', err);
      else console.log('Basic course information scraped successfully');
    });
  }
})








