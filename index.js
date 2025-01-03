// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", (req, res) => {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req, res) => {
  let timeStamp = req.params.date;
  if (timeStamp == null) {
    let date = new Date();
    return res.json({unix: date.valueOf(), utc: date.toUTCString()});
  }

  if (/\d{5,}/.test(timeStamp)) {
    timeStamp = Number(timeStamp);
  }

  let date = new Date(timeStamp);
  if (date.toUTCString() == "Invalid Date") {
    return res.json({error: "Invalid Date"});
  }

  return res.json({unix: date.valueOf(), utc: date.toUTCString()});
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
