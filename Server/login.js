const fs = require('fs');

let rawdata = fs.readFileSync('./Login.json');
let LoginData = JSON.parse(rawdata);

async function LoginCheck(Email, Password){
    let User = LoginData.find(user => user.email === Email);
    if (User){
        if (User.Password === Password){
            return true;
        }
    }
    return false;
}

module.exports.CheckLoginData = LoginCheck;