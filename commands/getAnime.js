const axios = require('axios');
const cheerio = require('cheerio');

const apiUrl = 'https://ani.gamer.com.tw/animeVideo.php?sn=';

module.exports = async (e) => {
  try {
    const { data } = await axios.get(apiUrl + e.message.text.substr(4));
    const $ = cheerio.load(data);
    const scoreNumber = $('.score-overall-number').text() || '找不到動畫';
    e.reply(scoreNumber);
  } catch (err) {
    console.log(err);
    e.reply('系統異常回報');
  }
};

// 動畫
// 'https://ani.gamer.com.tw/animeVideo.php?sn=20219';
// 搜尋
// https://ani.gamer.com.tw/search.php?keyword=間諜家家酒
// https://ani.gamer.com.tw/animeVideo.php?sn=28798
