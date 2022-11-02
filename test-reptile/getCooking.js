const axios = require('axios');
const cheerio = require('cheerio');

const apiUrl = 'https://icook.tw';
// https://icook.tw/search/起司/?page=1

const getData = async (text) => {
  try {
    const { data } = await axios.get(`${apiUrl}/search/${text}`);
    const $ = cheerio.load(data);
    const contentArr = [];
    $('.browse-recipe-item').each(function () {
      const imgSrc = $(this).find('img.browse-recipe-cover-img').attr('data-src');

      const title = $(this).find('.browse-recipe-name').text().trim();
      const by = $(this).find('.browse-username-by').text().trim();
      const description = $(this).find('.browse-recipe-content-description').text().trim();
      const ingredient = $(this).find('.browse-recipe-content-ingredient').text().trim();
      const link = apiUrl + $(this).find('.browse-recipe-link').attr('href');
      contentArr.push({
        imgSrc,
        title,
        by,
        description,
        ingredient,
        link,
      });
    });

    console.log(contentArr);
  } catch (err) {
    console.log(err);
  }
};
getData('起司');
