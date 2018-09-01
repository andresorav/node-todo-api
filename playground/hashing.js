const {SHA256} = require('crypto-js');
const {sign, verify} = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const password = 'kalamaja1234';
const hashedPassword = '$2a$10$M3RwWlLnFPVqzCtgndB/QenX9pY/XwP.OTlf3xH/6SxUQSLEE.k8W';

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log('Hash:',  hash);
  });
});

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(err, res);
});
/*

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
*/
