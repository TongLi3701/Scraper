var fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
var async = require('async');
const TeSsWriteApi = require('te_ss_write_api');  


var coursesInfo1 = JSON.parse(fs.readFileSync('coursesInfo.txt', 'utf8'));
var coursesInfo = []

for (var i = 0; i < 2; i++) {
  coursesInfo.push(coursesInfo1[i]);
}

var calls = coursesInfo.map((courseDetail) => (cb) => {
    request(courseDetail.url, (error, response, html) => {
      if(!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var topic_names = [];
        var target_audiences = [];

        var long_description = $('.course_body').text();

        $('.term_thumbnail_container').each((i,el) => {
          topic_names.push($(el).text().replace(/\s\s+/g,''));
        })
        $('.term_audience').each((i,el) => {
          target_audiences.push($(el).text().replace(/\s\s+/g,''));
        });

        var apiInstance = new TeSsWriteApi.MaterialsApi();

        var opts = { 
                    'material': {
                      'user_email': 'tong.li352711588@gmail.com',
                      'user_token': 'oBK5i4xj9bou3qXAw7wx',
                      'material': {
                        'title': courseDetail.title,
                        'url': courseDetail.url,
                        'short_description': courseDetail.short_description,
                        'long_description' : long_description,
                        'scientific_topic_names': topic_names,
                        'target_audience': target_audiences
                      } // Material | The information of the materials.
                    }
                  };
        var callback = function(error, data, response) {
          if (error) {
            console.error(error);
          } else {
            console.log('API called successfully. Returned data: ' + data);
          }
        }
        apiInstance.materialsJsonPost(opts, callback);
      }
    })
})
 

async.parallel(calls, () => {});