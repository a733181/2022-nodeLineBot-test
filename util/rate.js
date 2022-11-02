const axios = require('axios');

module.exports = async () => {
  try {
    const { data } = await axios.get('https://tw.rter.info/capi.php');
    return data.USDTWD.Exrate;
  } catch (err) {
    return 30;
  }
};
