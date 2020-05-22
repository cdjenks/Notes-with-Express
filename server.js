var express = require("express");
var bodyParser = require("body-parser");

var app = express();


require("./routes")(app);


var PORT = process.env.PORT || 4200;


app.use(bodyParser);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});