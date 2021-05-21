const express = require("express");
const fs = require("fs");

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

var date = new Date();

//File Write operation
app.post("/write-file", function(req,res){

    fs.writeFileSync("./TextFiles/"+date.getUTCDate()+"_"+date.getUTCHours()+"_"+date.getUTCMinutes()+".txt", date, function(err){
        if(err) throw err;
    });
    res.json({
        message:"File created",
    });
});

//Read Operation
app.get("/get-all-files", function(req,res){
    let listOfFiles = [];
    fs.readdirSync("./TextFiles").forEach((file)=>{
        listOfFiles.push(file);
    });
    if (listOfFiles.length === 0) {
        res.send("No files found");
      } else {
        res.send(listOfFiles);
      }
    });

//Server
app.get("/", (req, res) => {
    res.send("File operations using node js");
  });

app.listen(PORT, () => {
    console.log("server is up and running");
  });
