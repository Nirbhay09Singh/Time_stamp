var express = require('express');
var app = express();

// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/", (req, res) => {
  let date = new Date();

  return res.json({
    'unix': date.getTime(),
    'utc': date.toUTCString()
  });
});

app.get("/api/:date?", (req, res) => {
  let resultDate = '';

  let inputDate = new Date(req.params.date);

  if (inputDate.toString() == "Invalid Date") {
    inputDate = new Date(parseInt(req.params.date));
  }

  if (inputDate.toString() == "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  } else {
    return res.json({
      unix: inputDate.getTime(),
      utc: inputDate.toUTCString()
    });
  }

});


// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
