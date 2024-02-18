const fs = require('fs');
const http = require('http');
const AI = require('./AI');


//console.log(AI.RunAI());
//Server Initial Response
const server = http.createServer(function(req, res) {
  const filename = req.url.split('/');
  const FunReq = req.url.split('?');
  
  console.log("mm " + FunReq[0]);

  if (FunReq[0] === '/run-ai' && req.method === 'GET') {
    AI.RunAI(FunReq[1]).then(response => {
      console.log(response);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      
      res.end(JSON.stringify({ response }));
    }).catch(err => {
      console.log(err);
      return;
  });
  return;
  }

  try{
    console.log(req.url);
    if (filename[1] == "Images") {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'image/png');
      const img = fs.readFileSync(`./images/${filename[2]}`);
      res.write(img);
    }
    else if (filename[1] == "fonts"){
      res.statusCode = 200;
      res.setHeader('Content-Type', 'font/woff2');
      res.write(fs.readFileSync(`./fonts/${filename[2]}`));
    }
    else if (filename[1] == "MainScripts"){
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/javascript');
      res.write(fs.readFileSync(`./MainScripts/${filename[2]}`));
    }
    else if (filename[1] == "StarterDatabase.json"){
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/json');
      res.write(fs.readFileSync("./StarterDatabase.json"));
    }else if (FunReq[0] == "/MainPage.html"){

      console.log(FunReq[1].length);
      if ((FunReq[1] == undefined) || (FunReq[1].length != 32)) {

        res.statusCode = 404;
        res.write('404 Not Found');

      }else{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        const html = fs.readFileSync('./MainPage.html');
        res.write(html);
      }


    }
    else{
      switch (req.url) {
        case "/Style.css":
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/css');
          const css = fs.readFileSync('./Style.css');
          res.write(css);
          break;
  
        default:
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/html');
          const html = fs.readFileSync('./index.html');
          res.write(html);
      }
    }
  }
  catch (err) {
    res.statusCode = 404;
    res.write('404 Not Found');
  }
  res.end();
})

const port = 3000;

server.listen(port, function(error) {
  if (error) {
    console.log('Something went wrong', error);
  } else {
    console.log('Server is listening on port ' + port);
  }
});
