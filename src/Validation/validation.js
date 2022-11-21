const Name = function (value) {
    let name = /^[a-z ]{3,}$/;
    if (name.test(value)) return true;
};

const fullName = function (value) {
    let fullname = /^[a-zA-Z, ]{3,}$/;
    if (fullname.test(value)) return true;
};

const logoLink=  function (value) {
    let link= /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/;
    if (link.test(value)) return true;
};

const name = function (value) {
    let name = /^[a-zA-Z ]{3,}$/;
    if (name.test(value)) return true;
};

const email = function (value) {
    let email = /^[a-z0-9_]{3,}@gmail.com$/;
    if (email.test(value)) return true;
};  

const mobile = function (value) {
    let mobile = /^[0-9 ]{10,}$/;
    if (mobile.test(value)) return true;
};
 

module.exports.Name = Name
module.exports.fullName = fullName
module.exports.logoLink = logoLink
module.exports.name = name
module.exports.email = email
module.exports.mobile = mobile