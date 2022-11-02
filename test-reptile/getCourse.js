const axios = require('axios');
const cheerio = require('cheerio');

const getData = async () => {
  try {
    const { data } = await axios.get('https://wdaweb.github.io/');

    const $ = cheerio.load(data);
    const courses = [];
    $('#general .card-title').each(function () {
      courses.push($(this).text().trim());
    });
    console.log(courses.join(''));
  } catch (err) {
    console.log(err);
  }
};

getData();
