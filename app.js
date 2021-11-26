const express = require('express');
const port = 8000;
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded());


app.get('/',function(req,res){
    res.sendFile(__dirname+ "/index.html");
})

app.post('/weather_app',function(req,res){
    
    const query = req.body.cityName;
    const apiKey ="";

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units=metric";
    
    //call api and get response using http function
    https.get(url,function(response){   //otherwise we would have two res
        //console.log(response.statusCode);
        
        //some data has been received, operate on that data
        response.on('data',function(data){

            //JSON.parse converts the JSON string to Javascript value or object
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            
            //When we've to write many things and then send all those, we use res.write() and then res.send()
            res.write('<p>The weather is '+weatherDescription+'.</p>')
            res.write('<h1>The temperature is '+temp+' degree Celcius.</h1>');
            res.write('<img src='+imageURL+'>');
            res.send();
        })
    })
})
/*
https.get(url,function(response){   //otherwise we would have two res
        //console.log(response.statusCode);

        response.on('data',function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
           
            res.write('<p>The weather is '+weatherDescription+'.</p>')
            res.write('<h1>The temperature is '+temp+' degree Celcius.</h1>');
            res.write('<img src='+imageURL+'>');
            res.send();
        })
    })
*/

app.listen(port,function(err){
    if(err){
        console.log('Error in running server on port:'+port);
        return;
    }
    console.log('Server is running on port:'+port);
})
