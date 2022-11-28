const emailValidator = require('email-validator');

function checkId(id) {
    if (!id) throw 'Error: You must provide an id to search for';
    if (typeof id !== 'string') throw 'Error: id must be a string';
    id = id.trim();
    if (id.length === 0) throw 'Error: id cannot be an empty string or just spaces';
    return id;
}

function checkString(string, parameter) {
    if (!string || typeof string != 'string' || string.trim().length == 0) throw `Please enter your ${parameter}.`;
    return string.trim();
}

// Throws an error if the provided username is taken or it does not meet every requirement
function checkUsername(username) {
    checkString(username, 'username');

    // Check if username contains any illegal characters
    if (!/^[a-zA-Z0-9]+$/g.test(username)) throw 'Username contains illegal characters.';
    // Check if username is of sufficient length
    if (username.length < 8) throw 'Username must be at least 8 characters long.';
    return username.toLowerCase(); //for storage purposes
}

// Throws an error if the provided password does not meet every requirement
function checkPassword(password) {
    checkString(password, 'password');
    
    // Check if password contains any illegal characters
    if (/\s/g.test(password)) throw 'Password contains illegal characters.';
    // Check if password is of sufficient length
    if (password.length < 8) throw 'Password must be at least 8 characters long.';
    return password;
}

function checkEmail(email) {
    checkString(email, 'email');
    if (!emailValidator.validate(email)) throw "Email is invalid.";
    return email;
}

function leapYear(year){
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}
function checkValidDate(date){
    let splitSearchTerm = date.split("/");
    if(splitSearchTerm.length != 3){throw "Date should be in the form of MM/DD/YYYY (ex. 01/30/2001)";}
    let year = splitSearchTerm[2]
    let month = splitSearchTerm[0];
    let day = splitSearchTerm[1];
    
    if(year === 'null' || month === 'null' || day === 'null') {throw "Date should be in the form of MM/DD/YYYY (ex. 01/30/2001)";}
    if (year.trim().length === 0) {throw "Date should be in the form of MM/DD/YYYY (ex. 01/30/2001)";}
    if (month.trim().length === 0) {throw "Date should be in the form of MM/DD/YYYY (ex. 01/30/2001)";}
    if (day.trim().length === 0) {throw "Date should be in the form of MM/DD/YYYY (ex. 01/30/2001)";}
    if(splitSearchTerm[0].length != 2){throw "Date should be in the form of MM/DD/YYYY (ex. 01/30/2001)";}
    if(splitSearchTerm[1].length != 2){throw "Date should be in the form of MM/DD/YYYY (ex. 01/30/2001)";}
    if(splitSearchTerm[2].length != 4){throw "Date should be in the form of MM/DD/YYYY (ex. 01/30/2001)";}
    year = Number(year);
    month = Number(month);
    day = Number(day);
    if(typeof year !== 'number' || isNaN(year)){throw "Date should be in the form of MM/DD/YYYY (ex. 01/30/2001)";}
    if(typeof month !== 'number' || isNaN(month)){throw "Date should be in the form of MM/DD/YYYY (ex. 01/30/2001)";}
    if(typeof day !== 'number' || isNaN(day)){throw "Date should be in the form of MM/DD/YYYY (ex. 01/30/2001)";}

    if(month < 1 || month > 12){throw "Date should be in the form of MM/DD/YYYY (ex. 01/30/2001)";}
    if(day > 31 || day < 1) {throw "Date should be in the form of MM/DD/YYYY (ex. 01/30/2001)";}
    if(month === 4 || month === 6 || month === 9 || month === 11){
        if(day > 30){throw "Date should be in the form of MM/DD/YYYY (ex. 01/30/2001)";}
    }
    if(month === 2 && day > 28 && !leapYear(year)){throw "Date should be in the form of MM/DD/YYYY (ex. 01/30/2001)";}
    if(month === 2 && day > 29 && leapYear(year)){throw "Date should be in the form of MM/DD/YYYY (ex. 01/30/2001)";}
    return date;
}

function checkKeyword(keyword){
    keyword = checkString(keyword, 'keyword');
    if (keyword != "Title" && keyword != "Director" && keyword != "Actor" && keyword != "Release Date" && keyword != "Reviewer") throw "Keyword is invalid.";
    return keyword;
}

function checkSearchTerm(searchTerm,keyword){
    if(searchTerm){
        if (!/^[a-zA-Z0-9\ \-]+$/g.test(searchTerm)) throw 'Search term contains illegal characters.';
        if(typeof searchTerm != 'string' || searchTerm.trim().length == 0){ throw 'Search term is invalid';} //search term exists make sure it is correct type and not just spaces
        searchTerm = searchTerm.trim();
        if(keyword == "Release Date"){ checkValidDate(searchTerm); } //validate that the user provides a data in the form of 2001-01-30
        return searchTerm;
    } else {
        return searchTerm //empty search term is valid
    }   
}

function checkBankBalance(balance){
    if (!balance) {throw 'Error: You must provide a valid balance';}
    balance = Number(balance);
    balance = Math.round(balance * 100) / 100;
    if (balance < 0) {throw 'Error: You must provide a valid balance';}
    return balance;
}

function checkCreditBalance(balance){
    if (!balance) {throw 'Error: You must provide a valid balance';}
    balance = Number(balance);
    balance = Math.round(balance * 100) / 100;
    if (balance < 0) {throw 'Error: You must provide a valid balance';}
    return balance;
}

function checkCreditLimit(limit){
    if (!limit) {throw 'Error: You must provide a valid limit';}
    limit = Number(limit);
    limit = Math.round(limit * 100) / 100;
    if (limit < 0) {throw 'Error: You must provide a valid limit';}
    return limit;
}

function getRounded(number){
    return Math.round(number * 100) / 100;
}

module.exports = {
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
}