require('dotenv').config();
const lineBot = require('linebot');
const schedule = require('node-schedule');

const getCourse = require('./commands/getCourse');
const getCooking = require('./commands/getCooking');
const getAnime = require('./commands/getAnime');
const rateUpdate = require('./util/rate');

const bot = lineBot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});
// 關閉 https 驗證檢查
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

let USDTWD = 30;
const updateRate = async () => {
  USDTWD = await rateUpdate();
};

schedule.scheduleJob('0 0 * * *', updateRate);
updateRate();

bot.on('message', (e) => {
  if (e.message.type !== 'text') return;
  if (e.message.text === '測試' || e.message.text === 'test') {
    e.reply(e.message.text);
  } else if (e.message.text === '共通課程') {
    getCourse(e);
  } else if (e.message.text.startsWith('查動畫 ')) {
    getAnime(e);
  } else if (e.message.text === '查匯率') {
    e.reply(USDTWD.toString());
  } else {
    getCooking(e, e.message.text);
  }
});

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動');
});
