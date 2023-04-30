document.getElementById("searchBtn").addEventListener("click", addResult);
document.getElementById("searchBtn").addEventListener('click', getResult);

function addResult(){
    inputCity = document.getElementById("myInput").value;  
    var searchCity =$("<div>") 
    searchCity.attr('id',inputCity) 
    searchCity.text(inputCity) 
    searchCity.addClass("h4")
}; 

function getResult(){   
    $(".five-day").empty();
    $(".city").empty()
   inputCity = document.getElementById("myInput").value;   
    var countryCode='US';    
    var cityCode=inputCity;       
    
    var geoLon;   
    var geoLat;
        
    var cityName =$("<h>")    
    cityName.addClass("h3")  
    var temp = $("<div>")    
    var wind = $("<div>")    
    var humidity = $("<div>")   
    var icon =$("<img>")
    icon.addClass("icon");    
    var dateTime = $("<div>")

    $(".city").addClass("list-group")
    $(".city").append(cityName)    
    $(".city").append(dateTime)    
    $(".city").append(icon)    
    $(".city").append(temp)    
    $(".city").append(wind)    
    $(".city").append(humidity)    
   
    var geoUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityCode + "," + countryCode + "&limit=5&units=metric&appid=7d1b285353ccacd5326159e04cfab063"
      fetch(geoUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          geoLon = data[0].lon;
          geoLat = data[0].lat;
          var weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + geoLat + "&lon="+ geoLon + "&units=metric&appid=7d1b285353ccacd5326159e04cfab063";
          
          fetch(weatherUrl)

          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            weatherSymbol= data.list[0].weather[0].icon;
            imgSrc = "https://openweathermap.org/img/wn/" + weatherSymbol + ".png";
            icon.attr('src',imgSrc)
        
            cityName.text(cityCode);

            let currentTime = new Date(data.list[0].dt * 1000);
            var date = currentTime.toLocaleDateString();
            dateTime.text("("+ date + ")");

            temp.text("Temperature: "+ data.list[0].main.temp + " °C");
            humidity.text("Humidity: " + data.list[0].main.humidity + " %");
            wind.text("Wind Speed: " + data.list[0].wind.speed + " KPH");

            for (var i=7;i<data.list.length;i=i+8){
                var blueContainer = $("<div>")
                this["futureDate"+i] = $("<h>")
                this["futureIcon"+i] = $("<img>")
                this["futureTemp"+i] = $("<div>")
                this["futureWind"+i] = $("<div>")
                this["futureHumidity"+i] = $("<div>");
                this["forecastDay"+i] = new Date(data.list[i].dt * 1000);
                (this["futureDate"+i]).text(this["forecastDay"+i].toLocaleDateString());     

                (this["futureTemp"+i]).text("Temperature: "+ data.list[i].main.temp + " °C");
                (this["futureWind"+i]).text("Wind: "+ data.list[i].wind.speed + " KPH");
                (this["futureHumidity"+i]).text("Humidity: " + data.list[i].main.humidity + " %");
                (this["weatherIcon"+i])= data.list[i].weather[0].icon;
        
                DateimgSrc = "https://openweathermap.org/img/wn/" + (this["weatherIcon"+i]) + ".png";  
                (this["futureIcon"+i]).attr('src',DateimgSrc)

                $(".five-day").append(blueContainer)
                blueContainer.append((this["futureDate"+i]));
                blueContainer.append((this["futureIcon"+i]));
                blueContainer.append((this["futureTemp"+i]));
                blueContainer.append((this["futureWind"+i]));
                blueContainer.append((this["futureHumidity"+i]));
                blueContainer.addClass("individual-days")
            }
          })
    })
}


function getInfo() {
    var currentList =localStorage.getItem("city");
    if (currentList !== null ){
        freshList = JSON.parse(currentList);
        return freshList;
    } else {
        freshList = [];
    }
    return freshList;
}