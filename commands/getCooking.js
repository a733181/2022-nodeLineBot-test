const axios = require('axios');
const cheerio = require('cheerio');
require('dotenv').config();

const template = require('../template/cooking.json');
const writeJson = require('../util/wirtejson');

const apiUrl = 'https://icook.tw';

const renderHandler = (e, contentArr) => {
  const cookings = [];
  contentArr.forEach((cooking, index) => {
    if (index < 12) return;
    const replyMessage = JSON.parse(JSON.stringify(template));
    replyMessage.hero.url = cooking.imgSrc;
    replyMessage.body.contents[0].text = cooking.title;
    replyMessage.body.contents[1].contents.push(
      {
        type: 'box',
        layout: 'baseline',
        spacing: 'sm',
        contents: [
          {
            type: 'text',
            text: 'by',
            color: '#aaaaaa',
            size: 'sm',
            flex: 1,
          },
          {
            type: 'text',
            text: cooking.by,
            wrap: true,
            color: '#666666',
            size: 'sm',
            flex: 5,
          },
        ],
      },
      {
        type: 'box',
        layout: 'baseline',
        spacing: 'sm',
        contents: [
          {
            type: 'text',
            color: '#aaaaaa',
            size: 'sm',
            flex: 1,
            text: '說明：',
          },
          {
            type: 'text',
            text: cooking.description,
            wrap: true,
            color: '#666666',
            size: 'sm',
            flex: 5,
          },
        ],
      },
      {
        type: 'box',
        layout: 'baseline',
        spacing: 'sm',
        contents: [
          {
            type: 'text',
            text: '食材：',
            color: '#aaaaaa',
            size: 'sm',
            flex: 1,
          },
          {
            type: 'text',
            text: cooking.ingredient,
            wrap: true,
            color: '#666666',
            size: 'sm',
            flex: 5,
          },
        ],
      },
    );
    replyMessage.footer.contents.action.uri = cooking.link;
    cookings.push(replyMessage);
  });

  const reply = {
    type: 'flex',
    altText: '食譜查詢結果',
    contents: {
      type: 'carousel',
      contents: cookings,
    },
  };
  e.reply(reply);
  writeJson(reply, 'cooking');
};

module.exports = async (e, text) => {
  try {
    const { data } = await axios.get(`${apiUrl}/search/${text}`);
    const $ = cheerio.load(data);
    const contentArr = [];
    $('.browse-recipe-item').each(function () {
      const imgSrc = $(this).find('img.browse-recipe-cover-img').attr('data-src');

      const title = $(this).find('.browse-recipe-name').text().trim();
      const by = $(this).find('.browse-username-by').text().trim();
      const description = $(this).find('.browse-recipe-content-description').text().trim() || '無';
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
    renderHandler(e, contentArr);
  } catch (err) {
    e.reply('找不到食譜');
  }
};
