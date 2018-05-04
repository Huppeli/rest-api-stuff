var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function(req, res) {
  // scrape some stuff

  url = 'https://www.new-iihf.com/en/events/2018/wm/teams/roster/1607/finland';

  request(url, function(error, response, html) {

    if(!error) {
      var $ = cheerio.load(html);

      var results = [];

      var stuff = $(".m-statistics-table--players .js-left-table .js-table-row").each(function() {
        var playerNames = $(this).find(".s-cell--name").text().trim();
        var metadata = {
          name: playerNames
        };
        results.push(metadata);
      });
    }
    fs.writeFile('output.json', JSON.stringify(results, null, 4), function(err){
      console.log('File successfully written! - Check your project dir for the output.json file');
    })
    res.send('Check your console')
  });


})

app.listen('8081')

console.log('Magic happens on port 8081');

exports = module.exports = app;
