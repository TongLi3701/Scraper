# Scraper API

The Scraper API is use to collect courses information online and push them on TeSS website. There are mainly two files (file names need to be changed to make more sense)
- test-node.js : Collect basic information (title, url, short_description) and save them in coursesInfo.txt file, the course information is in json format.
- allInfo.js : Read the basic information from the coursesInfo.txt file and check through all related courses to get more information.

In order to run the whole script, you need to setup a local development, see https://github.com/TongLi3701/Scraper_API for local setup.

Please run test-node.js first and then run allInfo.js 