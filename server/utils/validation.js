const { User } = require('../models');
const validator = require('validator');
const StatusEnum = require('./statusEnum');

const checkUserExists = async (email) => {
    return await User.findOne({ where: { email } });
};

const validateUserFields = ({ name,firstName, email, password, confirmPassword, role }) => {
    if (!name || !firstName || !email || !password || !confirmPassword || !role) {
        return { valid: false, message: 'Toate campurile sunt obligatorii' };
    }

    if(typeof name !== "string" || typeof firstName !== "string" || typeof role !== "string"){
        return { valid: false, message: 'Numele si prenumele trbuie sa fie de tip string' };
    }

    if(!checkPasswords({ password, confirmPassword })){
        return { valid: false, message: 'Parolele nu sunt identice' };
    }

    if(!validateEmail(email)){
        return { valid: false, message: 'Emali-ul este invalid' };
    }

    return { valid: true };
};

const validateArticle = ({title, content, idAuthor}) => {

    if(!title || typeof title !== 'string' || !content || typeof content !== 'string'){
        return {valid: false, message: "Titlul si continutul sunt obligatorii si trebuie sa fie de tip string"};
    }

    if (!idAuthor || typeof idAuthor !== 'number' || idAuthor <= 0) {
        return {valid: false, message: 'Id-ul autorului trebuie sa fie un numar intreg pozitiv'};
    }

    return {valid: true};
}

const validateUpdateArticle = ({ title, content, status }) => {
    if (title && typeof title !== 'string') {
        return { valid: false, message: "Titlul trebuie să fie un string." };
    }

    if (content && typeof content !== 'string') {
        return { valid: false, message: "Conținutul trebuie să fie un string." };
    }

    if (status && ![StatusEnum.PENDING, StatusEnum.NEEDS_REVISION, StatusEnum.REJECTED, StatusEnum.ACCEPTED].includes(status)) {
        return { valid: false, message: "Statusul trebuie să fie unul dintre următoarele: PENDING, NEEDS_REVISION, REJECTED, ACCEPTED" };
    }

    return { valid: true };
};



const validateEmail = (email) => validator.isEmail(email);

const checkPasswords = ({password, confirmPassword}) => {
    return password === confirmPassword;
};

module.exports = {
    checkUserExists,
    validateUserFields,
    validateArticle,
    validateUpdateArticle
};
