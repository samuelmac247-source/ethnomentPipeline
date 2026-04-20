const loginNegativeCases = [
  {
    name: 'blocks login when username is missing the email domain',
    username: 'samuel.udochukwu',
    password: 'Boeing@86',
    validationTarget: 'username',
    expectedMessage: /include an '@'|email address|missing an '@'/i,
  },
  {
    name: 'blocks login when username format is invalid',
    username: 'samuel.udochukwu@',
    password: 'Boeing@86',
    validationTarget: 'username',
    expectedMessage: /include an '@'|email address|missing an '@'|following '@'|incomplete/i,
  },
];

module.exports = { loginNegativeCases };
