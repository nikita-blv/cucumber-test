const crypto =  require('crypto');

const BOOKS = [
    {
        id: 1,
        name: 'HARRY POTTER',
    },
    {
        id: 2,
        name: 'THE GREAT GATSBY',
        outOfStock: true,
    },
    {
        id: 3,
        name: 'The Old Man and The Sea',
    },
]

module.exports = class UserService {
    #users = []

    createUser({ email, name }) {
        const user = this.findUserByEmail(email)

        if (user) {
            const status = 409;
            const error = new Error('User already exist');
            error.status = status;
            error.code = 'duplicate_user';

            throw error;
        }

        const id = crypto.randomBytes(16).toString("hex");

        const newUser = { id, name, email, books: [] }

        this.#users.push(newUser);

        return newUser;
    }

    findUserByEmail(email) {
        return this.#users.find((user) => user.email === email) ?? null
    }

    findUserById(id) {
        return this.#users.find((user) => user.id === id) ?? null
    }

    findBookById(id) {
        return BOOKS.find((user) => user.id === id) ?? null
    }

    addBookToUser(bookId, email) {

        const book = this.findBookById(bookId);

        if (!book) {
            const status = 404;
            const error = new Error('Book not found');
            error.status = status;
            error.code = 'not_found';

            throw error;
        }

        if (book.outOfStock) {
            const status = 409;
            const error = new Error('Book out os stock');
            error.status = status;
            error.code = 'out_of_stock';

            throw error;
        }

        const user = this.findUserByEmail(email);

        if (!user) {
            const status = 404;
            const error = new Error('User not found');
            error.status = status;
            error.code = 'not_found';

            throw error;
        }

        this.#users = this.#users.map((user) => user.id === user.id ? { ...user, books: [user.books, book.id] } : user);

        return this.findUserById(user.id);
    }
}
