const firstName = function (value) {
    let fname = /^[a-z ]{3,}$/;
    if (fname.test(value)) return true;
};

const lastName = function (value) {
    let lname = /^[a-z ]{3,}$/;
    if (lname.test(value)) return true;
};

const isValidEmail = function (value) {
    let email = /^[a-z0-9_]{3,}@[a-z]{3,}.[a-z]{3,}$/;
    if (email.test(value)) return true;
};  

const isValidPassword = function (value) {
    let password= /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&])[a-zA-Z0-9@#$%&]{8,100}$/;
    if (password.test(value)) return true;
};

const title = function (value) {
    let title1 = /^[a-zA-Z ]{3,}$/;
    if (title1.test(value)) return true;
};

const body = function (value) {
    let bodydata = /^[a-zA-Z ]{3,}$/;
    if (bodydata.test(value)) return true;
};

const authorId = function (value) {
    let authorid = /^[a-zA-Z0-9  ]{3,}$/;
    if (authorid.test(value)) return true;
};

const category = function (value) {
    let categorydata = /^[a-zA-Z0-9 ]{3,}$/;
    if (categorydata.test(value)) return true;
};

module.exports.isValidEmail = isValidEmail
module.exports.isValidPassword = isValidPassword
module.exports.firstName = firstName
module.exports.lastName = lastName
module.exports.title = title
module.exports.body = body
module.exports.authorId=authorId
module.exports.category = category
