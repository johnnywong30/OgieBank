const emailValidator = require('email-validator');

async function checkId(id) {
    if (!id) throw 'Error: You must provide an id to search for';
    if (typeof id !== 'string') throw 'Error: id must be a string';
    id = id.trim();
    if (id.length === 0) throw 'Error: id cannot be an empty string or just spaces';
    return id;
}

async function checkString(string, parameter) {
    if (!string || typeof string !== 'string' || string.trim().length === 0) throw `Please enter your ${parameter}.`;
    return string.trim();
}

// Throws an error if the provided username is taken or it does not meet every requirement
async function checkUsername(username) {
    await checkString(username, 'username');

    // Check if username contains any illegal characters
    if (!/^[a-zA-Z0-9]+$/g.test(username)) throw 'Error: Username contains illegal characters.';
    // Check if username is of sufficient length
    if (username.length < 8) throw 'Error: Username must be at least 8 characters long.';
    return username.toLowerCase(); //for storage purposes, not case sensitive
}

// Throws an error if the provided password does not meet every requirement
async function checkPassword(password) {
    await checkString(password, 'password');
    
    // Check if password contains any illegal characters
    if (/\s/g.test(password)) throw 'Error: Password contains illegal characters.';
    // Check if password is of sufficient length
    if (password.length < 8) throw 'Error: Password must be at least 8 characters long.';
    return password;
}

async function checkEmail(email) {
    await checkString(email, 'email');
    if (!emailValidator.validate(email)) throw "Error: Email is invalid.";
    return email.toLowerCase(); //for storage purposes, not case sensitive
}

async function leapYear(year){
    return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
}

function checkValidDate(date){
    let splitSearchTerm = date.split("/");
    if(splitSearchTerm.length !== 3){throw "Error: Date should be in the form of MM/DD/YYYY (ex. 01/30/2001)";}
    let year = splitSearchTerm[2]
    let month = splitSearchTerm[0];
    let day = splitSearchTerm[1];
    
    if(year === 'null' || month === 'null' || day === 'null') {throw "Error: Date should be in the form of MM/DD/YYYY (ex. 01/30/2001)";}
    if (year.trim().length === 0) {throw "Error: Date should be in the form of MM/DD/YYYY (ex. 01/30/2001)";}
    if (month.trim().length === 0) {throw "Error: Date should be in the form of MM/DD/YYYY (ex. 01/30/2001)";}
    if (day.trim().length === 0) {throw "Error: Date should be in the form of MM/DD/YYYY (ex. 01/30/2001)";}
    if(splitSearchTerm[0].length !== 2){throw "Error: Date should be in the form of MM/DD/YYYY (ex. 01/30/2001)";}
    if(splitSearchTerm[1].length !== 2){throw "Error: Date should be in the form of MM/DD/YYYY (ex. 01/30/2001)";}
    if(splitSearchTerm[2].length !== 4){throw "Error: Date should be in the form of MM/DD/YYYY (ex. 01/30/2001)";}
    year = Number(year);
    month = Number(month);
    day = Number(day);
    if(typeof year !== 'number' || isNaN(year)){throw "Error: Date should be in the form of MM/DD/YYYY (ex. 01/30/2001)";}
    if(typeof month !== 'number' || isNaN(month)){throw "Error: Date should be in the form of MM/DD/YYYY (ex. 01/30/2001)";}
    if(typeof day !== 'number' || isNaN(day)){throw "Error:  should be in the form of MM/DD/YYYY (ex. 01/30/2001)";}

    if(month < 1 || month > 12){throw "Error: Date should be in the form of MM/DD/YYYY (ex. 01/30/2001)";}
    if(day > 31 || day < 1) {throw "Error: Date should be in the form of MM/DD/YYYY (ex. 01/30/2001)";}
    if(month === 4 || month === 6 || month === 9 || month === 11){
        if(day > 30){throw "Error: Date should be in the form of MM/DD/YYYY (ex. 01/30/2001)";}
    }
    if(month === 2 && day > 28 && !leapYear(year)){throw "Error: Date should be in the form of MM/DD/YYYY (ex. 01/30/2001)";}
    if(month === 2 && day > 29 && leapYear(year)){throw "Error: Date should be in the form of MM/DD/YYYY (ex. 01/30/2001)";}
    return date;
}

async function checkKeyword(keyword){
    keyword = await checkString(keyword, 'keyword');
    if (keyword !== "Title" && keyword !== "Director" && keyword !== "Actor" && keyword !== "Release Date" && keyword !== "Reviewer") throw "Error: Keyword is invalid.";
    return keyword;
}

async function checkSearchTerm(searchTerm,keyword){
    if(searchTerm){
        if (!/^[a-zA-Z0-9\ \-]+$/g.test(searchTerm)) throw 'Error: Search term contains illegal characters.';
        if(typeof searchTerm != 'string' || searchTerm.trim().length === 0){ throw 'Error: Search term is invalid';} //search term exists make sure it is correct type and not just spaces
        searchTerm = searchTerm.trim();
        if(keyword === "Release Date"){ await checkValidDate(searchTerm); } //validate that the user provides a data in the form of 2001-01-30
        return searchTerm;
    } else {
        return searchTerm //empty search term is valid
    }   
}

async function checkBankBalance(balance){
    if (!balance) {throw 'Error: You must provide a valid balance';}
    balance = Number(balance);
    balance = Math.round(balance * 100) / 100;
    if (balance < 0) {throw 'Error: You must provide a valid balance';}
    return balance;
}

async function checkCreditBalance(balance){
    if (!balance) {throw 'Error: You must provide a valid balance';}
    balance = Number(balance);
    balance = Math.round(balance * 100) / 100;
    if (balance < 0) {throw 'Error: You must provide a valid balance';}
    return balance;
}

async function checkCreditLimit(limit){
    if (!limit) {throw 'Error: You must provide a valid limit';}
    limit = Number(limit);
    limit = Math.round(limit * 100) / 100;
    if (limit < 0) {throw 'Error: You must provide a valid limit';}
    return limit;
}

function getRounded(number){
    return Math.round(number * 100) / 100;
}

// jordan tested
async function confirmPassword(password1, password2) {
    password1 = await checkPassword(password1);
    password2 = await checkPassword(password2);
    if (password1 !== password2) throw 'Error: Password fields must match.';
    return password2;
}

async function checkName(name, parameter) {
    name = await checkString(name, parameter)
    const regEx = new RegExp('[A-zÀ-ú]')
    if (!regEx.test(name)) throw `Error: ${parameter} must only contain letters`
    return name
}

const validation = {
    checkId,
    checkString,
    checkUsername,
    checkPassword,
    checkEmail,
    checkKeyword,
    checkSearchTerm,
    checkBankBalance,
    checkCreditBalance,
    checkCreditLimit,
    getRounded,
    checkValidDate,
    leapYear,
    confirmPassword,
    checkName
}

export default validation;