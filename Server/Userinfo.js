const fs = require('fs');

let rawdata = fs.readFileSync('./Login.json');
let logindata = JSON.parse(rawdata);

function GetUserData(UserID){
    let User = logindata.find(User => User.UserID === UserID);
    return User;
}