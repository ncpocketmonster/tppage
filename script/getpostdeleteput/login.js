let args = process.argv.splice(2);
let colors = require('colors');  
  
  
colors.setTheme({  
    silly: 'rainbow',  
    input: 'grey',  
    verbose: 'cyan',  
    prompt: 'red',  
    info: 'green',  
    data: 'blue',  
    help: 'cyan',  
    warn: 'yellow',  
    debug: 'magenta',  
    error: 'red'  
});  


if( ! (args[0] && args[1] )){
  console.error('at least 2 inputs'.error);
  process.exit();
}

let [username,password] = args;

const crypto = require('crypto');
let sha512 = crypto.createHash('sha512');
sha512.update(username+password);
let hash1 = sha512.digest('hex');

let obj = {
  'username' : username,
  'password' : hash1,
}
let url = 'http://localhost/api/login';


let request = require('request');
request({
  url: url,
  method: "POST",
  json: true,
  headers: { "content-type": "application/json", },
  body: obj
}, function(error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body);
  }
  else{
    let fs = require('fs');
    fs.writeFile('x.html', body);
  }
}); 