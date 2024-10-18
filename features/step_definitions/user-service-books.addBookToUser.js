const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');

Given('attempt to add book to user', function () {
    this.userService = new global.UserService();

    this.existedUser = {
        email: 'existed.user@gmail.com',
        name: 'Nikita',
    }

    this.userService.createUser(this.existedUser)

    this.error = null;
});

When('user with email: {string} trying to add book with bookId: {string}', async function (email, bookId) {
    this.inputParams = { email, bookId };
    try {
        this.userResult = this.userService.addBookToUser(+bookId, email)
    }catch (error) {

        this.error = { code: error.code, status: error.status, message: error.message };
    }
});

Then('result is {string}', function (result) {

    if (result === 'user not found') {
        assert.deepEqual(this.error, { status: 404, code: 'not_found', message: 'User not found' });
    }

    if (result === 'book not found') {
        assert.deepEqual(this.error, { status: 404, code: 'not_found', message: 'Book not found' });
    }

    if (result === 'book out of stock') {
        assert.deepEqual(this.error, { status: 409, code: 'out_of_stock', message: 'Book out os stock' });
    }


    if (result === 'book added') {
        assert.deepEqual(this.userResult.books.includes(+this.inputParams.bookId), true);
    }
})