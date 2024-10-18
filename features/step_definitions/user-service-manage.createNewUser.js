const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');

Given('attempt to create new user', function () {
    this.userService = new global.UserService();

    this.existedUser = {
        email: 'existed.user@gmail.com',
        name: 'Nikita',
    }

    this.userService.createUser(this.existedUser)

    this.error = null;
});

When('credentials provided email:{string} and name:{string}', async function (email, name) {
    this.inputParams = { email, name };

    try {
        this.createdUser = this.userService.createUser({ email, name });
        this.inputParams.id = this.createdUser.id;
    } catch (error) {
        this.error = { code: error.code, status: error.status };
    }

});

Then('create {string}', function (result) {

    if (result === 'user should be created') {
        assert(this.createdUser, { ...this.inputParams });
    }

    if (result === 'user should not be created') {
        assert.deepEqual(this.error, { status: 409, code: 'duplicate_user' });
    }
})