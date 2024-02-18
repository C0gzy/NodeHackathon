const fs = require('fs');
const http = require('http');

//Server Initial Response
const server = http.createServer(function(req, res) {
  const filename = req.url.split('/');
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
    }else{
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
