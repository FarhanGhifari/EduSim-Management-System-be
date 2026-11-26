const getCounting = require("./get-counting");

module.exports = (repositories) => {
  return {
    getCounting: getCounting.bind(null, repositories),
  };
};
