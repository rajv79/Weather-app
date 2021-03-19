
  const express = require("express");
  const https = require("https");
  const app = express();
  const bodyparser = require("body-parser");

    app.use(bodyparser.urlencoded({extended: true}));

      // this will set  and check if the server is running or not .
    app.get("/",function(req,res){

        res.sendFile(__dirname + "/index.html");


        })

        app.post("/",function(req,res){

           req.body.cityName;

          //this url is the link which was made by the postman application and add https:// infront of it
          const query = req.body.cityName;
         const apkey = "b66c0cbb0366687189cbdcc0b8bd4d64";
         const unit = "metric";

         const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apkey+"&units=" +unit;

         https.get(url,function(response){
           console.log(response.statusCode);

           response.on("data",function(data){
           const weatherdata = JSON.parse(data);
           const temp = weatherdata.main.temp;
           const descrip = weatherdata.weather[0].description;
           const icon = weatherdata.weather[0].icon;

           const imageurl = "http://openweathermap.org/img/wn/" + icon +"@2x.png"
            res.write(" <h1>The temperature in the "+query+" is :" + temp + "  Degree celcius.</h1> ")
           res.write("The weather discription is : "+ descrip);
           res.write("<img src = "+ imageurl +">")
           res.send();
           })

      })

        })


  app.listen(3000,function(){
    console.log("Server is running on 3000 port");
  });
