const validateName = (name) => {
    if (name.length < 8) {
        const error = {
            status: 400,
            message: '"displayName" length must be at least 8 characters long',
        };
        throw error;
    }
};

// https://www.simplilearn.com/tutorials/javascript-tutorial/email-validation-in-javascript
const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailRegex.test(email)) {
        const error = {
            status: 400,
            message: '"email" must be a valid email',
        };
        throw error;
    }
};

const validatePassword = (password) => {
    if (password.length < 6) {
        const error = {
            status: 400,
            message: '"password" length must be at least 6 characters long',
        };
        throw error;
    }
};

const validateUser = (req, _res, next) => {
    const { displayName, email, password } = req.body;
    if (!displayName || !email || !password) {
        const error = {
            status: 400,
            message: '"displayName", "email" and "password" are required',
        };
        throw error;
    }
    validateName(displayName);
    validateEmail(email);
    validatePassword(password);
    next();
};

module.exports = validateUser;