const express = require("express");
const date = require(__dirname + "/date.js");


const app = express();


var items = ["Buy Food", "Cook Food", "Eat Food"];
var workItems = [];

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req, res){

  let day = date.getDate();

  res.render('index', {listTitle : day, newListItems : items});

});

app.post("/", function(req,res){

  console.log(req.body);

  var item = req.body.newItem;

  if(req.body.button === "Work"){
    workItems.push(item);
    res.redirect('/work');
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req,res){
  res.render("index", {listTitle : "Work Items", newListItems : workItems});
});

app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
