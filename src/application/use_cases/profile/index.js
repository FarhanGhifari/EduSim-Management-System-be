const getProfile = require("./get-profile");
const updateProfileInfo = require("./update-profile-info");
const updateProfilePassword = require("./update-profile-password");

module.exports = (repositories) => {
  return {
    getProfile: getProfile.bind(null, repositories),
    updateProfileInfo: updateProfileInfo.bind(null, repositories),
    updateProfilePassword: updateProfilePassword.bind(null, repositories),
  };
};
