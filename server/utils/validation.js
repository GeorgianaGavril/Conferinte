const { User } = require("../models");
const validator = require("validator");
const StatusEnum = require("./statusEnum");

// cauta in bd un user cu un anumit email
// functia este folosita pentru a vedea daca mai exista un user cu acelasi email
const checkUserExists = async (email) => {
  return await User.findOne({ where: { email } });
};

// verificam daca datele primite indeplinesc conditiile si sunt prezente in cerere
const validateUserFields = ({
  name,
  firstName,
  email,
  password,
  confirmPassword,
  role,
}) => {
  if (!name || !firstName || !email || !password || !confirmPassword || !role) {
    return { valid: false, message: "Toate campurile sunt obligatorii" };
  }

  if (
    typeof name !== "string" ||
    typeof firstName !== "string" ||
    typeof role !== "string"
  ) {
    return {
      valid: false,
      message: "Numele si prenumele trbuie sa fie de tip string",
    };
  }

  if (!checkPasswords({ password, confirmPassword })) {
    return { valid: false, message: "Parolele nu sunt identice" };
  }

  if (!validateEmail(email)) {
    return { valid: false, message: "Emali-ul este invalid" };
  }

  return { valid: true };
};

const validateArticle = ({ title, content, idAuthor }) => {
  if (
    !title ||
    typeof title !== "string" ||
    !content ||
    typeof content !== "string"
  ) {
    return {
      valid: false,
      message:
        "Titlul si continutul sunt obligatorii si trebuie sa fie de tip string",
    };
  }

  if (!idAuthor || typeof idAuthor !== "number" || idAuthor <= 0) {
    return {
      valid: false,
      message: "Id-ul autorului trebuie sa fie un numar intreg pozitiv",
    };
  }

  return { valid: true };
};

const validateUpdateArticle = ({ title, content, status }) => {
  if (title && typeof title !== "string") {
    return { valid: false, message: "Titlul trebuie să fie un string." };
  }

  if (content && typeof content !== "string") {
    return { valid: false, message: "Conținutul trebuie să fie un string." };
  }

  if (
    status &&
    ![
      StatusEnum.PENDING,
      StatusEnum.NEEDS_REVISION,
      StatusEnum.REJECTED,
      StatusEnum.ACCEPTED,
    ].includes(status)
  ) {
    return {
      valid: false,
      message:
        "Statusul trebuie să fie unul dintre următoarele: PENDING, NEEDS_REVISION, REJECTED, ACCEPTED",
    };
  }

  return { valid: true };
};

const validateReview = ({ idReviewer, idArticle, content, rating }) => {
  if (!content || typeof content !== "string") {
    return {
      valid: false,
      message: "Continutul trebuie sa fie string si sa nu fie null.",
    };
  }
  if (!rating || typeof rating !== "number" || rating < 1 || rating > 5) {
    return { valid: false, message: "Ratingul poate fi intre 1 si 5." };
  }
  if (!idReviewer || typeof idReviewer !== "number" || idReviewer <= 0) {
    return {
      valid: false,
      message: "Id-ul reviewerului trebuie sa fie un numar intreg pozitiv",
    };
  }
  if (!idArticle || typeof idArticle !== "number" || idArticle <= 0) {
    return {
      valid: false,
      message: "Id-ul reviewerului trebuie sa fie un numar intreg pozitiv",
    };
  }

  return { valid: true };
};

const validateUpdateReview = ({ content, rating }) => {
  if (content && typeof content !== "string") {
    return {
      valid: false,
      message: "Continutul trebuie sa fie string si sa nu fie null.",
    };
  }
  if (rating && (typeof rating !== "number" || rating < 1 || rating > 5)) {
    return { valid: false, message: "Ratingul poate fi intre 1 si 5." };
  }

  return { valid: true };
};

// verificam daca variabila email are structura necesara a unui email
const validateEmail = (email) => validator.isEmail(email);

// verificam daca parola si parola de confirmare sunt la fel
const checkPasswords = ({ password, confirmPassword }) => {
  return password === confirmPassword;
};

// validam campurile care au venit in cererea post, este important ca numele, descrierea si locatia
// sa fie stringuri, date sa fie intr un format corect ca sa poata fi stocata corect in bd iar
// idOrganizer trebuie sa fie un numar deoarece este o cheie straina
const validateConference = ({name, description, date, location, idOrganizer}) => {

    if(!name || typeof name !== 'string' || !description || typeof description !== 'string' || !location || typeof location !== 'string'){
        return {valid: false, message: "Numele, descrierea si locatia sunt obligatorii si trebuie sa fie de tip string"};
    }

    const parsedDate = new Date(date);
    if(isNaN(parsedDate.getTime())){
        return {valid: false, message: "Data conferintei nu este valida"};
    }


    if (!idOrganizer || typeof idOrganizer !== 'number' || idOrganizer <= 0) {
        return {valid: false, message: 'Id-ul organizatorului trebuie sa fie un numar intreg pozitiv'};
    }

    return {valid: true};
}


// acelasi lucru ca la validateConference doar ca aici campurile pot lipsi deoarce se face
// actualizarea doar campurilor necesare
const validateUpdateConference = ({name, description,  date, location}) => {
    if (name && typeof name !== 'string') {
        return { valid: false, message: "Numele trebuie să fie un string." };
    }

    if (description && typeof description !== 'string') {
        return { valid: false, message: "Descrierea trebuie să fie un string." };
    }

    if(date && typeof date === 'string'){
        const parsedDate = new Date(date);
        if(isNaN(parsedDate.getTime())){
            return {valid: false, message: "Data conferintei nu este valida"};
        }
    }

    if (location && typeof location !== 'string') {
        return { valid: false, message: "Locatia trebuie să fie un string." };
    }

    return { valid: true };
};

module.exports = {
  checkUserExists,
  validateUserFields,
  validateArticle,
  validateUpdateArticle,
    validateConference,
    validateUpdateConference,
  validateReview,
  validateUpdateReview,
};
