const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors({
  optionsSuccessStatus: 200
})); // some legacy browsers choke on 204


app.use(express.static('public'));


app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api", (req, res) => {
  const now = new Date();
  res.json({
    unix: now.getTime(),
    utc: now.toUTCString()
  });
})
app.get("/api/:timestamp", (req, res) => {
  const paramsDate = req.params.timestamp;
  const invalidDate = "Invalid Date";
  const date = parseInt(paramsDate) < 10000 ?
    new Date(paramsDate) :
    new Date(parseInt(paramsDate))

  date.toString() === invalidDate ?
    res.json({
      error: invalidDate
    }) :
    res.json({
      unix: date.valueOf(),
      utc: date.toUTCString()
    });
})


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({
    greeting: 'hello API'
  });
});



// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});