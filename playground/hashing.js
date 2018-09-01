const {SHA256} = require('crypto-js');
const {sign, verify} = require('jsonwebtoken');

const message = 'Some random string';
const hash = SHA256(message).toString();

console.log(`Message: ${message}`);
console.log(`Hash: ${hash}`);

const data = {
  id: 123
};

const token = sign(data, 'salt1234');
console.log('Token: ', token);

const decoded = verify(token, 'salt1234');
console.log('Decoded', decoded);
