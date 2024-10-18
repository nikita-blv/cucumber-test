const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');

Given('attempt to find user by email', function () {
    this.userService = new global.UserService();

    this.existedUser = {
        email: 'existed.user@gmail.com',
        name: 'Nikita',
    }

    this.userService.createUser(this.existedUser)

    this.error = null;
});

When('email to find:{string}', async function (email) {
    this.inputParams = { email };
    this.userResult = this.userService.findUserByEmail(email);
});

Then('user was {string}', function (result) {

    if (result === 'found') {
        assert(this.userResult.email, this.inputParams.email);
    }

    if (result === 'not found') {
        assert.deepEqual(this.userResult, null);
    }
})