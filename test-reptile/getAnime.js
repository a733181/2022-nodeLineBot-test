const axios = require('axios');
const cheerio = require('cheerio');

const apiUrl = 'https://ani.gamer.com.tw/animeVideo.php?sn=20219';

const main = async () => {
  try {
    const { data } = await axios.get(apiUrl);
    const $ = cheerio.load(data);
    const scoreNumber = $('.score-overall-number').text() || '找不到動畫';
    console.log(scoreNumber);
  } catch (err) {
    console.log(err);
  }
};

main();

// 動畫
// 'https://ani.gamer.com.tw/animeVideo.php?sn=20219';
// 搜尋
// https://ani.gamer.com.tw/search.php?keyword=間諜家家酒
// https://ani.gamer.com.tw/animeVideo.php?sn=28798
