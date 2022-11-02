const axios = require('axios');
const cheerio = require('cheerio');

const template = require('../template/course');
const writeJson = require('../util/wirtejson');

const apiUrl = 'https://wdaweb.github.io/';

module.exports = async (e) => {
  try {
    const { data } = await axios.get(apiUrl);

    const $ = cheerio.load(data);
    const courses = [];
    $('#general .card').each(function () {
      const bubble = JSON.parse(JSON.stringify(template));
      // eslint-disable-next-line newline-per-chained-call
      bubble.hero.url = apiUrl + $(this).find('img').attr('src').trim().substr(2);
      bubble.body.contents[0].text = $(this).find('.card-title').text().trim();
      bubble.body.contents[1].contents[0].contents[0].text = $(this)
        .find('.card-description')
        .text()
        .trim();
      courses.push(bubble);
    });

    const reply = {
      type: 'flex',
      altText: '共通課程查詢結果',
      contents: {
        type: 'carousel',
        contents: courses,
      },
    };
    e.reply(reply);

    writeJson(reply, 'course');
  } catch (err) {
    e.reply('找不到課程');
  }
};
