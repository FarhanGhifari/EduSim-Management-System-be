const login = require("./login");

module.exports = (repositories) => {
    return {
        authLogin: login.bind(null, repositories)
    };
};
