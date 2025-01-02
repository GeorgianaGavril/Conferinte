const { User } = require('../models');
const validator = require('validator');

const checkUserExists = async (email) => {
    return await User.findOne({ where: { email } });
};

const validateUserFields = ({ lastname,firstname, email, password, confirmPassword, role }) => {
    if (!lastname || !firstname || !email || !password || !confirmPassword || !role) {
        return { valid: false, message: 'All fields are mandatory' };
    }

    if(!checkPasswords({ password, confirmPassword })){
        return { valid: false, message: 'Password do not match' };
    }

    if(!validateEmail(email)){
        return { valid: false, message: 'Invalid email' };
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
