// Import dependency modules
const bcrypt = require("bcryptjs");
// Password encryption Function
const encryptPWD = (password) => {
    // Hash password and salt with md5 encryption
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};
// Password comparison Functon
const comparePWD = (enteredPassword, passwordFromDB) => {
    // Compare two 
    return bcrypt.compareSync(enteredPassword, passwordFromDB);
};
// Export module
module.exports = { encryptPWD, comparePWD };