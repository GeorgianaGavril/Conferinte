const { User } = require('../models');

const checkUserExists = async (email) => {
    return await User.findOne({ where: { email } });
};

const validateUserFields = ({ name, email, password, role }) => {
    if (!name || !email || !password || !role) {
        return { valid: false, message: 'All fields are mandatory' };
    }
    return { valid: true };
};

module.exports = {
    checkUserExists,
    validateUserFields
};
