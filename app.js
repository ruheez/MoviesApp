//-------import required modules-----------
const express = require("express");
const https = require("https");
const http = require("http");
const bodyParser = require("body-parser");
const ejs = require("ejs");

//------code to make everything work together------
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(express.static("public"));

//--------current year-----------
const year = new Date().getFullYear();

//-----------get home page------------
app.get("/", function(req, res) {
  res.render("index", {
    year: year
  });
});

//----------post home page-----------
app.post("/", function(req, res){
  console.log(req.body.movieName);

  const title = req.body.movieName;
  const apiKey = "YOUR_API_KEY";
  const apiUrl = "http://www.omdbapi.com/?t=" + title + "&apikey=" + apiKey;

  http.get(apiUrl, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const movieData = JSON.parse(data);
      const released = movieData.Released;
      const plot = movieData.Plot;
      const country = movieData.Country;
      const posterUrl = movieData.Poster;
      const moneyMade = movieData.BoxOffice;
      res.render("displayData", {
        title: title,
        released: released,
        plot: plot,
        country: country,
        posterUrl: posterUrl,
        moneyMade: moneyMade,
        year: year
      });
    });
  });
});

//----------listen on port 3000----------
app.listen(3000, function(req, res){
  console.log("Server is running on port 3000.");
});
