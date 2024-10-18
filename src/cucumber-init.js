const { BeforeAll } = require('@cucumber/cucumber');
const UserService = require('./services/userService');

const beforeAllInit = function () {
    global.UserService = UserService;
}

BeforeAll(beforeAllInit);