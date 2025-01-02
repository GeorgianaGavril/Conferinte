const { User } = require('../models');
const validator = require('validator');

const checkUserExists = async (email) => {
    return await User.findOne({ where: { email } });
};

const validateUserFields = ({ name,firstName, email, password, confirmPassword, role }) => {
    if (!name || !firstName || !email || !password || !confirmPassword || !role) {
        return { valid: false, message: 'Toate campurile sunt obligatorii' };
    }

    if(!checkPasswords({ password, confirmPassword })){
        return { valid: false, message: 'Parolele nu sunt identice' };
    }

    if(!validateEmail(email)){
        return { valid: false, message: 'Emali-ul este invalid' };
    }

    return { valid: true };
};

const validateEmail = (email) => validator.isEmail(email);

const checkPasswords = ({password, confirmPassword}) => {
    return password === confirmPassword;
};

module.exports = {
    checkUserExists,
    validateUserFields
};
