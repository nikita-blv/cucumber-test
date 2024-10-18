Feature: UserService

  Scenario Outline: UserService.createNewUser
    Given attempt to create new user
    When credentials provided email:"<email>" and name:"<name>"
    Then create "<result>"

    Examples:
      | email                  | name         | result                     |
      | new.nikita@gmail.com   | Nikita       | user should be created     |
      | existed.user@gmail.com | Existed User | user should not be created |

  Scenario Outline: UserService.findUserByEmail
    Given attempt to find user by email
    When email to find:"<email>"
    Then user was "<result>"

    Examples:
      | email                  | result    |
      | new.nikita@gmail.com   | not found |
      | existed.user@gmail.com | found     |

  Scenario Outline: UserService.addBookToUser
    Given attempt to add book to user
    When user with email: "<email>" trying to add book with bookId: "<bookId>"
    Then result is "<result>"

    Examples:
      | email                  | bookId | result            |
#      | new.nikita@gmail.com   | 1      | user not found    |
#      | existed.user@gmail.com | 123    | book not found    |
#      | existed.user@gmail.com | 2      | book out of stock |
      | existed.user@gmail.com | 3      | book added        |